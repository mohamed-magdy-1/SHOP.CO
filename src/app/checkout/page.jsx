"use client"
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { MdOutlinePayment } from "react-icons/md";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CheckoutPage() {

  const router = useRouter();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    }
  }, [token, router]);


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    zip: '',
    address: '',
  });

  const [cartProduct, setCartProduct] = useState([]); 
  const [allPrice, setAllPrice] = useState([]); 
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartProducts');
    if (storedCart) {
      setCartProduct(JSON.parse(storedCart));
    }
  }, []);


const totalOrderAmount = allPrice.reduce((total, item) => total + item, 0);
async function fetchDataPrice() {
  try {
    const updatedPrices = await Promise.all(
      cartProduct.map(async (item) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?filters[title][$eq]=${item.title}&fields=price&fields=discount`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );
        
        const data = await response.json();
        const productData = data?.data[0];
        if (!productData) return 0;

        const originalPrice = productData.price * item.projectsAmountNeed
        const discountAmount = originalPrice * (productData.discount / 100);
        return originalPrice - discountAmount;

      })
    );
    setAllPrice(updatedPrices);
  } catch (error) {
    console.error("Error fetching prices:", error);
  }
}

useEffect(() => {
  fetchDataPrice();
}, [cartProduct]); 



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const filteredItems = cartProduct.map(({ imgProduct,priceAmount,price,projectsAmount, ...rest }) => rest);

  const handleOrderCreation = async () => {
    setLoading(true);
    const orderData = {
      ...formData,
      orderItemList: filteredItems,
      userId: 'user_123',
      totalOrderAmount,
    };
console.log(orderData);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/orders`,{
        headers: { 'Authorization': `Bearer ${token}` }
      }, orderData);
      setClientSecret(response.data.clientSecret);
      toast.success('data created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating order');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = Object.values(formData).every((value) => value.trim() !== '');

  return (
    <div className="container m-auto grid grid-cols-1 p-4">
      <div>{totalOrderAmount}</div>
      {/* Form */}
      <form onSubmit={(e) => e.preventDefault()} className="grid gap-2 mb-4">
        <div className="flex gap-2 w-full">
          <input required name="username" value={formData.username} onChange={handleChange} className="border w-full outline-none rounded-lg p-2" type="text" placeholder="Username" />
          <input required name="email" value={formData.email} onChange={handleChange} className="border w-full outline-none rounded-lg p-2" type="email" placeholder="Email" />
        </div>

        <div className="flex gap-2 w-full">
          <input required name="phone" value={formData.phone} onChange={handleChange} className="border w-full outline-none rounded-lg p-2" type="number" placeholder="Phone" />
          <input required name="zip" value={formData.zip} onChange={handleChange} className="border w-full outline-none rounded-lg p-2" type="number" placeholder="Zip" />
        </div>

        <textarea required name="address" value={formData.address} onChange={handleChange} className="border outline-none rounded-lg p-2 w-full h-[200px]" placeholder="Address"></textarea>

        <div className="flex justify-center items-center">
          <button
            disabled={!isFormValid || loading}
            onClick={handleOrderCreation}
            className="p-3 flex gap-2 justify-center items-center disabled:bg-gray-500 disabled:cursor-not-allowed w-[150px] rounded-lg cursor-pointer bg-black text-white"
          >
            {loading ? 'Loading...' : 'Pay Now'}
            <MdOutlinePayment />
          </button>
        </div>
      </form>

      {/* Payment Section */}
      <div className="my-5">
        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
