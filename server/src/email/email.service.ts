import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  async sendPasswordResetEmail(to: string, token: string) {
    const resetUrl = `http://localhost:5000/reset-password?token=${token}`;

    await this.transporter.sendMail({
      from: 'CRBank <noreply@crbank.com>',
      to,
      subject: 'Сброс пароля',
      html: `Для сброса пароля перейдите по <a href="${resetUrl}">ссылке</a>.`,
    });
  }

  async sendUsernameReminderEmail(to: string, username: string) {
    await this.transporter.sendMail({
      from: 'CRBank <noreply@crbank.com>',
      to,
      subject: 'Напоминание username',
      text: `Ваш username: ${username}`,
    });
  }
}