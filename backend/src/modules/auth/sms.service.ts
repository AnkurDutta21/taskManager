import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  async sendOTP(phone: string, otp: string): Promise<void> {
    // TODO: Integrate with actual SMS service (Twilio, AWS SNS, MSG91, etc.)
    // For now, we'll just log the OTP
    this.logger.log(`Sending OTP to ${phone}: ${otp}`);
    
    // Example implementation with console log
    console.log('='.repeat(50));
    console.log('SMS OTP VERIFICATION');
    console.log(`To: ${phone}`);
    console.log(`Message: Your verification OTP is ${otp}. Valid for 10 minutes.`);
    console.log('='.repeat(50));
    
    // When integrating with real SMS service (e.g., Twilio), uncomment and configure:
    /*
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    
    await client.messages.create({
      body: `Your verification OTP is ${otp}. Valid for 10 minutes. Do not share this code.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
    */

    // For MSG91 (popular in India):
    /*
    const axios = require('axios');
    await axios.get('https://api.msg91.com/api/v5/otp', {
      params: {
        authkey: process.env.MSG91_AUTH_KEY,
        mobile: phone,
        otp: otp,
        template_id: process.env.MSG91_TEMPLATE_ID
      }
    });
    */
  }

  async sendWelcomeSMS(phone: string, firstName: string): Promise<void> {
    this.logger.log(`Sending welcome SMS to ${phone}`);
    console.log('='.repeat(50));
    console.log('WELCOME SMS');
    console.log(`To: ${phone}`);
    console.log(`Message: Welcome ${firstName}! Your phone number has been verified successfully.`);
    console.log('='.repeat(50));
  }
}