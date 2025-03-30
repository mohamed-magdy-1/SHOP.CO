'use client'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import {useState } from 'react';
import { toast } from 'react-toastify';

const CheckoutForm = ({ clientSecret }) => {



  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  // دالة للتنبيهات
  const notify = (message, type = 'error') => {
    toast[type](message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      notify('Stripe is not initialized!');
      return;
    }

    setLoading(true);

    try {
      // تأكيد إرسال البيانات
      const { error: submitError } = await elements.submit();
      if (submitError) {
        notify(`Error sending data: ${submitError.message}`);
        setLoading(false);
        return;
      }

      // تأكيد الدفع
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: "http://localhost:3000/success",
        },
      });

      if (error) {
        notify(`Payment failed: ${error.message}`);
      } else {
        notify('Payment successful!', 'success');
      }
    } catch (err) {
      notify(`Error processing payment: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <PaymentElement />
        <button type="submit" disabled={!stripe || loading} className="bg-blue-500 text-white p-2 rounded-lg">
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;
