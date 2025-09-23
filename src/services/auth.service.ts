import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.config';
import { sequelize, models } from '../db';

export class AuthService {
  static async register(data: any) {
    const { username, email, password, clientType } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await models.User.create({
      username,
      email,
      passwordHash: hashedPassword,
      clientType,
      roleId: 1,
    });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return { accessToken: token, user: user.get({ plain: true }) };
  }

  static async login(data: any) {
    const { email, password } = data;
    const user = await models.User.findOne({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return { accessToken: token, user: user.get({ plain: true }) };
  }

  static async authenticate(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
      const user = await models.User.findByPk(decoded.id, {
        include: [{ model: models.Role, as: 'role' }]
      });
      
      if (!user) return null;
      return user;
    } catch (error) {
      return null;
    }
  }
}