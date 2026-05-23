import nodemailer from 'nodemailer';
import logger from '../config/logger.js';

/**
 * Email Service using SendGrid
 */

const emailTransporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});

export const sendVerificationEmail = async (email, verificationLink) => {
  try {
    await emailTransporter.sendMail({
      from: process.env.SENDGRID_FROM_EMAIL,
      to: email,
      subject: 'Verify Your Email - ECommerce Platform',
      html: `
        <h1>Welcome to ECommerce Platform!</h1>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Verify Email
        </a>
        <p>Link expires in 24 hours.</p>
      `,
    });

    logger.info(`Verification email sent to ${email}`);
  } catch (error) {
    logger.error('Email sending error:', error);
    throw new Error('Failed to send verification email');
  }
};

export const sendPasswordResetEmail = async (email, resetLink) => {
  try {
    await emailTransporter.sendMail({
      from: process.env.SENDGRID_FROM_EMAIL,
      to: email,
      subject: 'Reset Your Password - ECommerce Platform',
      html: `
        <h1>Password Reset Request</h1>
        <p>We received a request to reset your password. Click the link below to proceed:</p>
        <a href="${resetLink}" style="background-color: #2196F3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
        <p>Link expires in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });

    logger.info(`Password reset email sent to ${email}`);
  } catch (error) {
    logger.error('Email sending error:', error);
    throw new Error('Failed to send password reset email');
  }
};

export const sendOrderConfirmationEmail = async (email, orderDetails) => {
  try {
    const itemsHTML = orderDetails.items
      .map(item => `<tr><td>${item.name}</td><td>${item.quantity}</td><td>$${item.price}</td></tr>`)
      .join('');

    await emailTransporter.sendMail({
      from: process.env.SENDGRID_FROM_EMAIL,
      to: email,
      subject: `Order Confirmation - #${orderDetails.orderId}`,
      html: `
        <h1>Order Confirmed!</h1>
        <p>Thank you for your order. Here are the details:</p>
        <table border="1" cellpadding="10">
          <tr><th>Product</th><th>Quantity</th><th>Price</th></tr>
          ${itemsHTML}
        </table>
        <h3>Total: $${orderDetails.total}</h3>
        <p>Estimated Delivery: ${orderDetails.estimatedDelivery}</p>
        <p>Track your order: <a href="${orderDetails.trackingLink}">Click here</a></p>
      `,
    });

    logger.info(`Order confirmation email sent to ${email}`);
  } catch (error) {
    logger.error('Email sending error:', error);
    throw new Error('Failed to send order confirmation email');
  }
};

export const sendMerchantApprovalEmail = async (email, merchantName, approvalStatus) => {
  try {
    const message = approvalStatus === 'approved'
      ? 'Congratulations! Your merchant account has been approved. You can now start selling.'
      : 'Your merchant account application has been rejected. Please contact support for more information.';

    await emailTransporter.sendMail({
      from: process.env.SENDGRID_FROM_EMAIL,
      to: email,
      subject: `Merchant Account ${approvalStatus.charAt(0).toUpperCase() + approvalStatus.slice(1)} - ECommerce Platform`,
      html: `
        <h1>Merchant Account ${approvalStatus.charAt(0).toUpperCase() + approvalStatus.slice(1)}</h1>
        <p>Dear ${merchantName},</p>
        <p>${message}</p>
        <p>Best regards,<br>ECommerce Platform Team</p>
      `,
    });

    logger.info(`Merchant approval email sent to ${email}`);
  } catch (error) {
    logger.error('Email sending error:', error);
    throw new Error('Failed to send merchant approval email');
  }
};
