const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// Get user's order history
router.get('/orders', async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Placeholder for order history
    const orders = [
      {
        id: 'order_123',
        orderNumber: 'LV-2024-001',
        date: '2024-01-15T10:30:00Z',
        status: 'delivered',
        total: 45.99,
        items: [
          {
            bookId: 'book_1',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            price: 12.99,
            quantity: 1,
            format: 'hardcover'
          },
          {
            bookId: 'book_2',
            title: '1984',
            author: 'George Orwell',
            price: 9.99,
            quantity: 1,
            format: 'paperback'
          }
        ],
        shippingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        trackingNumber: 'TRK123456789'
      }
    ];

    res.json({ orders });

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Server error while fetching orders' });
  }
});

// Get order details
router.get('/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.userId;

    // Placeholder for order details
    const order = {
      id: orderId,
      orderNumber: 'LV-2024-001',
      date: '2024-01-15T10:30:00Z',
      status: 'delivered',
      subtotal: 22.98,
      tax: 2.30,
      shipping: 5.99,
      total: 31.27,
      items: [
        {
          bookId: 'book_1',
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          price: 12.99,
          quantity: 1,
          format: 'hardcover'
        },
        {
          bookId: 'book_2',
          title: '1984',
          author: 'George Orwell',
          price: 9.99,
          quantity: 1,
          format: 'paperback'
        }
      ],
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      billingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      paymentMethod: {
        type: 'card',
        last4: '4242',
        brand: 'visa'
      },
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-01-20T00:00:00Z'
    };

    res.json({ order });

  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ error: 'Server error while fetching order details' });
  }
});

// Create payment intent
router.post('/create-payment-intent', [
  body('amount').isInt({ min: 1 }).withMessage('Amount must be at least 1 cent'),
  body('currency').isIn(['usd', 'eur', 'gbp']).withMessage('Invalid currency'),
  body('items').isArray().withMessage('Items must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, currency, items } = req.body;
    const userId = req.user.userId;

    // Placeholder for creating payment intent
    const paymentIntent = {
      id: 'pi_' + Math.random().toString(36).substr(2, 9),
      amount,
      currency,
      status: 'requires_payment_method',
      client_secret: 'pi_' + Math.random().toString(36).substr(2, 9) + '_secret_' + Math.random().toString(36).substr(2, 9)
    };

    res.json({ 
      paymentIntent,
      items
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Server error while creating payment intent' });
  }
});

// Process payment
router.post('/process-payment', [
  body('paymentIntentId').notEmpty().withMessage('Payment intent ID is required'),
  body('items').isArray().withMessage('Items must be an array'),
  body('shippingAddress').isObject().withMessage('Shipping address is required'),
  body('billingAddress').isObject().withMessage('Billing address is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { paymentIntentId, items, shippingAddress, billingAddress } = req.body;
    const userId = req.user.userId;

    // Placeholder for processing payment
    const order = {
      id: 'order_' + Math.random().toString(36).substr(2, 9),
      orderNumber: 'LV-' + Date.now(),
      userId,
      paymentIntentId,
      items,
      shippingAddress,
      billingAddress,
      status: 'processing',
      total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      date: new Date().toISOString()
    };

    res.json({ 
      message: 'Payment processed successfully',
      order
    });

  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Server error while processing payment' });
  }
});

// Get user's saved payment methods
router.get('/payment-methods', async (req, res) => {
  try {
    const userId = req.user.userId;

    // Placeholder for saved payment methods
    const paymentMethods = [
      {
        id: 'pm_1',
        type: 'card',
        brand: 'visa',
        last4: '4242',
        expMonth: 12,
        expYear: 2025,
        isDefault: true
      },
      {
        id: 'pm_2',
        type: 'card',
        brand: 'mastercard',
        last4: '5555',
        expMonth: 8,
        expYear: 2026,
        isDefault: false
      }
    ];

    res.json({ paymentMethods });

  } catch (error) {
    console.error('Error fetching payment methods:', error);
    res.status(500).json({ error: 'Server error while fetching payment methods' });
  }
});

// Add payment method
router.post('/payment-methods', [
  body('paymentMethodId').notEmpty().withMessage('Payment method ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { paymentMethodId } = req.body;
    const userId = req.user.userId;

    // Placeholder for adding payment method
    const paymentMethod = {
      id: paymentMethodId,
      type: 'card',
      brand: 'visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2025,
      isDefault: false
    };

    res.json({ 
      message: 'Payment method added successfully',
      paymentMethod
    });

  } catch (error) {
    console.error('Error adding payment method:', error);
    res.status(500).json({ error: 'Server error while adding payment method' });
  }
});

// Remove payment method
router.delete('/payment-methods/:paymentMethodId', async (req, res) => {
  try {
    const { paymentMethodId } = req.params;
    const userId = req.user.userId;

    // Placeholder for removing payment method
    res.json({ 
      message: 'Payment method removed successfully',
      paymentMethodId
    });

  } catch (error) {
    console.error('Error removing payment method:', error);
    res.status(500).json({ error: 'Server error while removing payment method' });
  }
});

// Set default payment method
router.post('/payment-methods/:paymentMethodId/default', async (req, res) => {
  try {
    const { paymentMethodId } = req.params;
    const userId = req.user.userId;

    // Placeholder for setting default payment method
    res.json({ 
      message: 'Default payment method updated successfully',
      paymentMethodId
    });

  } catch (error) {
    console.error('Error setting default payment method:', error);
    res.status(500).json({ error: 'Server error while setting default payment method' });
  }
});

// Get shipping options
router.get('/shipping-options', async (req, res) => {
  try {
    const { zipCode, country = 'USA' } = req.query;

    // Placeholder for shipping options
    const shippingOptions = [
      {
        id: 'standard',
        name: 'Standard Shipping',
        price: 5.99,
        estimatedDays: '5-7 business days',
        description: 'Free on orders over $35'
      },
      {
        id: 'express',
        name: 'Express Shipping',
        price: 12.99,
        estimatedDays: '2-3 business days',
        description: 'Faster delivery'
      },
      {
        id: 'overnight',
        name: 'Overnight Shipping',
        price: 24.99,
        estimatedDays: '1 business day',
        description: 'Next day delivery'
      }
    ];

    res.json({ shippingOptions });

  } catch (error) {
    console.error('Error fetching shipping options:', error);
    res.status(500).json({ error: 'Server error while fetching shipping options' });
  }
});

// Calculate shipping cost
router.post('/calculate-shipping', [
  body('items').isArray().withMessage('Items must be an array'),
  body('zipCode').notEmpty().withMessage('Zip code is required'),
  body('country').notEmpty().withMessage('Country is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { items, zipCode, country, shippingMethod = 'standard' } = req.body;

    // Placeholder for shipping calculation
    const shippingCost = shippingMethod === 'standard' ? 5.99 : 
                        shippingMethod === 'express' ? 12.99 : 24.99;

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + shippingCost;

    res.json({ 
      shippingCost,
      subtotal,
      total,
      estimatedDays: shippingMethod === 'standard' ? '5-7' : 
                    shippingMethod === 'express' ? '2-3' : '1'
    });

  } catch (error) {
    console.error('Error calculating shipping:', error);
    res.status(500).json({ error: 'Server error while calculating shipping' });
  }
});

// Get refund status
router.get('/refunds/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.userId;

    // Placeholder for refund status
    const refund = {
      id: 're_' + Math.random().toString(36).substr(2, 9),
      orderId,
      amount: 45.99,
      status: 'succeeded',
      reason: 'Customer request',
      date: '2024-01-20T14:30:00Z'
    };

    res.json({ refund });

  } catch (error) {
    console.error('Error fetching refund status:', error);
    res.status(500).json({ error: 'Server error while fetching refund status' });
  }
});

// Request refund
router.post('/refunds', [
  body('orderId').notEmpty().withMessage('Order ID is required'),
  body('reason').notEmpty().withMessage('Refund reason is required'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { orderId, reason, amount } = req.body;
    const userId = req.user.userId;

    // Placeholder for refund request
    const refund = {
      id: 're_' + Math.random().toString(36).substr(2, 9),
      orderId,
      amount,
      reason,
      status: 'pending',
      date: new Date().toISOString()
    };

    res.json({ 
      message: 'Refund request submitted successfully',
      refund
    });

  } catch (error) {
    console.error('Error requesting refund:', error);
    res.status(500).json({ error: 'Server error while requesting refund' });
  }
});

module.exports = router; 