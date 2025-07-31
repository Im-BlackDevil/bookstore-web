import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      price: 24.99,
      originalPrice: 29.99,
      quantity: 1,
      image: '📚',
      rating: 4.5,
      inStock: true
    },
    {
      id: 2,
      title: 'Dune',
      author: 'Frank Herbert',
      price: 19.99,
      originalPrice: 24.99,
      quantity: 2,
      image: '📖',
      rating: 4.8,
      inStock: true
    },
    {
      id: 3,
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      price: 22.50,
      originalPrice: 22.50,
      quantity: 1,
      image: '🚀',
      rating: 4.7,
      inStock: false
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'welcome10') {
      setAppliedCoupon({ code: 'WELCOME10', discount: 10 });
    } else if (couponCode.toLowerCase() === 'summer20') {
      setAppliedCoupon({ code: 'SUMMER20', discount: 20 });
    } else {
      alert('Invalid coupon code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount / 100) : 0;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      alert('Order placed successfully! Redirecting to payment...');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty" style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem',
          opacity: 0.5
        }}>
          🛒
        </div>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '1rem'
        }}>
          Your cart is empty
        </h2>
        <p style={{
          color: '#6b7280',
          fontSize: '1.1rem',
          marginBottom: '2rem',
          maxWidth: '400px'
        }}>
          Looks like you haven't added any books to your cart yet. Start exploring our collection!
        </p>
        <Link to="/books" style={{
          background: 'linear-gradient(135deg, #6b46c1, #ec4899)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '1rem',
          transition: 'all 0.3s ease'
        }}>
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '0.5rem'
        }}>
          Shopping Cart
        </h1>
        <p style={{
          color: '#6b7280',
          fontSize: '1.1rem'
        }}>
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Cart Items */}
        <div className="cart-items">
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginBottom: '1rem'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1.5rem'
            }}>
              Cart Items
            </h3>
            
            {cartItems.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                marginBottom: '1rem',
                background: item.inStock ? 'white' : '#fef2f2'
              }}>
                <div style={{
                  fontSize: '2rem',
                  marginRight: '1rem',
                  opacity: item.inStock ? 1 : 0.5
                }}>
                  {item.image}
                </div>
                
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '0.25rem'
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem'
                  }}>
                    by {item.author}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      ⭐ {item.rating}
                    </span>
                    {!item.inStock && (
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#ef4444',
                        fontWeight: '500'
                      }}>
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginRight: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    overflow: 'hidden'
                  }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={!item.inStock}
                      style={{
                        padding: '0.5rem 0.75rem',
                        border: 'none',
                        background: item.inStock ? '#f3f4f6' : '#f9fafb',
                        cursor: item.inStock ? 'pointer' : 'not-allowed',
                        color: item.inStock ? '#374151' : '#9ca3af'
                      }}
                    >
                      -
                    </button>
                    <span style={{
                      padding: '0.5rem 1rem',
                      background: 'white',
                      borderLeft: '1px solid #d1d5db',
                      borderRight: '1px solid #d1d5db',
                      minWidth: '40px',
                      textAlign: 'center'
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={!item.inStock}
                      style={{
                        padding: '0.5rem 0.75rem',
                        border: 'none',
                        background: item.inStock ? '#f3f4f6' : '#f9fafb',
                        cursor: item.inStock ? 'pointer' : 'not-allowed',
                        color: item.inStock ? '#374151' : '#9ca3af'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div style={{
                  textAlign: 'right',
                  marginRight: '1rem'
                }}>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1f2937'
                  }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  {item.originalPrice > item.price && (
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      textDecoration: 'line-through'
                    }}>
                      ${(item.originalPrice * item.quantity).toFixed(2)}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    padding: '0.5rem'
                  }}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary" style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          position: 'sticky',
          top: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '1.5rem'
          }}>
            Order Summary
          </h3>
          
          {/* Coupon Code */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#374151',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Coupon Code
            </label>
            <div style={{
              display: 'flex',
              gap: '0.5rem'
            }}>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter code"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem'
                }}
              />
              <button
                onClick={applyCoupon}
                style={{
                  padding: '0.75rem 1rem',
                  background: '#6b46c1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Apply
              </button>
            </div>
            {appliedCoupon && (
              <div style={{
                marginTop: '0.5rem',
                padding: '0.5rem',
                background: '#dcfce7',
                color: '#166534',
                borderRadius: '4px',
                fontSize: '0.75rem'
              }}>
                Coupon {appliedCoupon.code} applied! {appliedCoupon.discount}% off
              </div>
            )}
          </div>
          
          {/* Price Breakdown */}
          <div style={{
            borderTop: '1px solid #e5e7eb',
            paddingTop: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span style={{ color: '#6b7280' }}>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                color: '#059669'
              }}>
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span style={{ color: '#6b7280' }}>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span style={{ color: '#6b7280' }}>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: '600',
              fontSize: '1.1rem',
              borderTop: '1px solid #e5e7eb',
              paddingTop: '0.5rem',
              marginTop: '0.5rem'
            }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          
          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={isCheckingOut || cartItems.some(item => !item.inStock)}
            style={{
              width: '100%',
              padding: '1rem',
              background: isCheckingOut || cartItems.some(item => !item.inStock) 
                ? '#9ca3af' 
                : 'linear-gradient(135deg, #6b46c1, #ec4899)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isCheckingOut || cartItems.some(item => !item.inStock) 
                ? 'not-allowed' 
                : 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '1rem'
            }}
          >
            {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
          </button>
          
          {cartItems.some(item => !item.inStock) && (
            <div style={{
              fontSize: '0.875rem',
              color: '#ef4444',
              textAlign: 'center'
            }}>
              Some items are out of stock
            </div>
          )}
          
          <div style={{
            fontSize: '0.75rem',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            Secure checkout powered by Stripe
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart; 