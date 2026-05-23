import twilio from 'twilio';
import logger from '../config/logger.js';

/**
 * SMS Service using Twilio
 */

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendOTPSMS = async (phoneNumber, otp) => {
  try {
    const message = await twilioClient.messages.create({
      body: `Your ECommerce verification code is: ${otp}. Valid for 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    logger.info(`OTP SMS sent to ${phoneNumber}`);
    return message.sid;
  } catch (error) {
    logger.error('SMS sending error:', error);
    throw new Error('Failed to send OTP');
  }
};

export const sendOrderUpdateSMS = async (phoneNumber, orderDetails) => {
  try {
    const message = await twilioClient.messages.create({
      body: `Your order #${orderDetails.orderId} has been ${orderDetails.status}. Track here: ${orderDetails.trackingLink}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    logger.info(`Order update SMS sent to ${phoneNumber}`);
    return message.sid;
  } catch (error) {
    logger.error('SMS sending error:', error);
    throw new Error('Failed to send order update');
  }
};

export const sendDeliveryNotificationSMS = async (phoneNumber, deliveryDetails) => {
  try {
    const message = await twilioClient.messages.create({
      body: `Your delivery is on the way! Driver: ${deliveryDetails.driverName}. ETA: ${deliveryDetails.eta}. Track: ${deliveryDetails.trackingLink}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    logger.info(`Delivery notification SMS sent to ${phoneNumber}`);
    return message.sid;
  } catch (error) {
    logger.error('SMS sending error:', error);
    throw new Error('Failed to send delivery notification');
  }
};

export const sendPromotionalSMS = async (phoneNumber, message) => {
  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    logger.info(`Promotional SMS sent to ${phoneNumber}`);
    return result.sid;
  } catch (error) {
    logger.error('SMS sending error:', error);
    throw new Error('Failed to send promotional SMS');
  }
};
