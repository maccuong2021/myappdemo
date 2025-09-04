import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../model/user';
import { AppDataSource } from '../../../data-source';

export class AuthenService {

  constructor() {
    if (!AppDataSource.isInitialized) {
      AppDataSource.initialize().catch((error) => {
        console.error('Error during Data Source initialization:', error);
      });
    }
  }

  private repo = AppDataSource.getRepository(User);
  private jwtSecret = process.env.JWT_SECRET || 'default_secret';

  async login(email: string, password: string): Promise<{ token: string } | null> {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return null;

    const token = jwt.sign(
      { id: user.id, name: user.name },
      this.jwtSecret,
      { expiresIn: '1h' }
    );

    return { token };
  }

  async getUserName(): Promise<string> {
    return "cuong";
  }

  async validatePassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
  }

  generateToken(user: Pick<User, 'id' | 'name'>): string {
    return jwt.sign(
      { id: user.id, name: user.name },
      this.jwtSecret,
      { expiresIn: '1h' }
    );
  }

  verifyToken(token: string): User | null {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as User;
      return decoded;
    } catch (error) {
      return null;
    }
  }
}