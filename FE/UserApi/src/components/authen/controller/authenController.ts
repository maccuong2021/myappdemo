import { Request, Response } from 'express';
import { AuthenService } from '../service/authenService';
import jwt from 'jsonwebtoken';

export class AuthController {
  constructor(private authenService: AuthenService) {}

  async login(req: Request, res: Response): Promise<string | null> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return null;
      }

      const result = await this.authenService.login(email, password);
      if (!result) {
        res.status(401).json({ error: 'Invalid credentials' });
        return null;
      }

      const decoded = jwt.verify(result.token, process.env.JWT_SECRET || 'default_secret') as { id: number; name: string };

      res.status(200).json({
        message: 'Login successful',
        token: result.token,
        user: {
          id: decoded.id,
          name: decoded.name
        }
      });

      return result.token;
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
      return null;
    }
  }

  async logout(_req: Request, res: Response): Promise<void> { 
    res.status(200).json({ message: 'Logout successful' });
  }

  async getUserName(_req: Request, res: Response): Promise<void> {
    try {
      const userName = await this.authenService.getUserName();
      res.status(200).json({ userName });
    } catch (error) {
      console.error('Error fetching user name:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
}