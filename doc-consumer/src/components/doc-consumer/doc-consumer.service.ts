import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import * as admin from 'firebase-admin';
import { join } from 'path';
import * as fs from 'fs';
import { TokenService } from '../token/token.service';
import { ConsumeMessage } from 'amqplib';

@Injectable()
export class DocConsumerService {
  private readonly logger = new Logger(DocConsumerService.name);

  constructor(private tokenService: TokenService) {
    if (!admin.apps.length) {
      const serviceAccountPath = join(__dirname, '../../../key.json');
      if (!fs.existsSync(serviceAccountPath)) {
        throw new Error(`Firebase service account key not found at ${serviceAccountPath}`);
      }

      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id,
      });

      this.logger.log('Firebase Admin initialized');
    }
  }

  @RabbitSubscribe({
    exchange: 'my_exchange',
    routingKey: 'my.routing.key',
    queue: process.env.RABBITMQ_QUEUE || 'myqueue',
    allowNonJsonMessages: true,
  })
  public async handleMessage(msg: any, amqpMsg?: ConsumeMessage) {
    this.logger.log(`Received message from RabbitMQ: ${JSON.stringify(msg)}`);

    const tokens = this.tokenService.getTokens();
    if (!tokens || tokens.length === 0) {
      this.logger.warn('No device tokens registered, skipping FCM send');
      return;
    }

    try {
      const multicastMessage: admin.messaging.MulticastMessage = {
        notification: {
          title: 'New Document',
          body: msg?.text || JSON.stringify(msg),
        },
        data: { msg: msg?.text || JSON.stringify(msg) },
        tokens,
      };

      const response = await admin.messaging().sendEachForMulticast(multicastMessage);


      this.logger.log(
        `Firebase notification sent: success=${response.successCount}, failure=${response.failureCount}`,
      );

      response.responses.forEach((r, i) => {
        if (!r.success) {
          this.logger.error(`Failed token: ${tokens[i]} - ${r.error}`);
        }
      });
    } catch (error) {
      this.logger.error(`Firebase notification error: ${error}`);
    }
  }
}
