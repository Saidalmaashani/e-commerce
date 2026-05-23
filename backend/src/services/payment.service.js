import axios from 'axios';
import logger from '../config/logger.js';

/**
 * Payment Service - Stripe Integration
 */

const stripe = axios.create({
  baseURL: 'https://api.stripe.com/v1',
  auth: {
    username: process.env.STRIPE_SECRET_KEY,
  },
});

export const createPaymentIntent = async (amount, currency = 'USD', metadata = {}) => {
  try {
    const response = await stripe.post('/payment_intents', {
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      metadata,
    });

    logger.info('Payment intent created:', response.data.id);
    return response.data;
  } catch (error) {
    logger.error('Stripe error:', error.response?.data || error.message);
    throw new Error('Payment processing failed');
  }
};

export const confirmPaymentIntent = async (intentId, paymentMethodId) => {
  try {
    const response = await stripe.post(`/payment_intents/${intentId}/confirm`, {
      payment_method: paymentMethodId,
    });

    return response.data;
  } catch (error) {
    logger.error('Payment confirmation error:', error.response?.data || error.message);
    throw new Error('Payment confirmation failed');
  }
};

export const refundPayment = async (chargeId, amount = null) => {
  try {
    const refundData = {
      charge: chargeId,
    };

    if (amount) {
      refundData.amount = Math.round(amount * 100);
    }

    const response = await stripe.post('/refunds', refundData);

    logger.info('Refund processed:', response.data.id);
    return response.data;
  } catch (error) {
    logger.error('Refund error:', error.response?.data || error.message);
    throw new Error('Refund processing failed');
  }
};

export const retrievePaymentIntent = async (intentId) => {
  try {
    const response = await stripe.get(`/payment_intents/${intentId}`);
    return response.data;
  } catch (error) {
    logger.error('Error retrieving payment intent:', error.message);
    throw new Error('Failed to retrieve payment details');
  }
};

export const createStripeCustomer = async (email, metadata = {}) => {
  try {
    const response = await stripe.post('/customers', {
      email,
      metadata,
    });

    return response.data;
  } catch (error) {
    logger.error('Error creating customer:', error.message);
    throw new Error('Failed to create customer');
  }
};
