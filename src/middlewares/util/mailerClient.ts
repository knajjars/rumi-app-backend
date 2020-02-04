import fetch from 'node-fetch';

import { sibKey, logger } from '../../configs';

const SIB_API_URL = `https://api.sendinblue.com/v3/smtp/email`;
const ACTIVATION_TEMPLATE = 11;
const DELEITION_TEMPLATE = 14;
const PWDRESET_TEMPLATE = 11;

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
      const body = `{"sender":{"name":"Mauricio de Aprta 🎉","email":"mauricio@aprta.com"},"to": [{"email": "${email}"}],"replyTo": { "email": "info@aprta.com"},"params": {"FNAME": "${firstName}", "TOKEN": "${token}" },"templateId": ${ACTIVATION_TEMPLATE} }`;
      await this.sendMail(body);
    } catch (error) {
      logger.error(error);
    }
  }

  public async sendResetPassword(firstName: string, email: string, token: string) {
    try {
      const body = `{"sender":{"name":"Empezá a usar Aprta 🎉","email":"puravida@aprta.com"},"to": [{"email": "${email}"}],"replyTo": { "email": "info@aprta.com"},"params": {"FNAME": "${firstName}", "TOKEN": "${token}" },"templateId": ${PWDRESET_TEMPLATE}}}`;
      await this.sendMail(body);
    } catch (error) {
      logger.error(error);
    }
  }

  public async sendDeleteAccount(accountEmail: string) {
    try {
      const body = `{"sender":{"name":"APRTA: DELETE REQUEST","email":"puravida@aprta.com"},"to":[{"email":"mourraille@me.com","name":"mauricio"},{"email":"knajfdjars@gmail.com","name":"khalil"} ],"templateId":${DELEITION_TEMPLATE}}, "params":{"FNAME":"${accountEmail}"}}`;
      await this.sendMail(body);
    } catch (error) {
      logger.error(error);
    }
  }
}

export const mailerClient = new MailerClient();
