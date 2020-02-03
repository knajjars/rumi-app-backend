import fetch from 'node-fetch';

import { sibKey, logger } from '../../configs';

const SIB_API_URL = `https://api.sendinblue.com/v3/smtp/email`;

class MailerClient {
  private async sendMail(body: string) {
    const response = await fetch(SIB_API_URL, {
      method: 'post',
      body: body,
      headers: {
        'Content-Type': 'application/json',
        'api-key': sibKey!
      }
    });
    await response.json();
  }

  public async sendAccountActivation(firstName: string, email: string, token: string) {
    try {
      const body = `{"sender":{"name":"Aprta","email":"puravida@aprta.com"},"to":[{"email":"${email}","name":"${firstName}"}],"templateId":11, "params":{"FNAME":"${firstName}","TOKEN":"${token}"}}`;
      await this.sendMail(body);
    } catch (error) {
      logger.error(error);
    }
  }

  public async sendResetPassword(firstName: string, email: string, token: string) {
    try {
      const body = `{"sender":{"name":"Aprta","email":"puravida@aprta.com"},"to":[{"email":"${email}","name":"${firstName}"}],"templateId":11, "params":{"FNAME":"${firstName}","TOKEN":"${token}"}}`;
      await this.sendMail(body);
    } catch (error) {
      logger.error(error);
    }
  }
}

export const mailerClient = new MailerClient();
