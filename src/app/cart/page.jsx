'use client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useCart } from '../../context/CartContext';
import { db } from '../../lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartPage() {
    // 1️⃣ Razorpay script loader – Place near the top of the file
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const handleRazorpayPayment = async () => {
  if (!form.name || !form.phone || !form.address) {
    alert("Please fill out delivery info.");
    return;
  }

  const res = await loadRazorpayScript();
  if (!res) {
    alert("Failed to load Razorpay SDK");
    return;
  }

  const options = {
    key: "rzp_test_BebNJtXEPATy9Z", // Replace with your Razorpay Key ID
    amount: totalAmount * 100, // Razorpay uses paise
    currency: "INR",
    name: "TrichyFood",
    description: "Order Checkout",
    image: "/logo.svg",
    handler: async function (response) {
      // ✅ Save order to Firestore
      const docRef = await addDoc(collection(db, 'orders'), {
        ...form,
        payment_id: response.razorpay_payment_id,
        items: cart.map(item => ({
          name: item.name,
          price: item.price,
          qty: item.qty
        })),
        total: totalAmount,
        createdAt: serverTimestamp(),
        status: "paid"
      });

      clearCart();
      setSuccessId(docRef.id);
    },
    prefill: {
      name: form.name,
      email: "", // optional
      contact: form.phone
    },
    notes: {
      address: form.address
    },
    theme: {
      color: "#22c55e" // Lime Green
    },
    method: {
    upi: true,
    card: true,
    netbanking: true,
  }

  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
  const { cart, removeFromCart, changeQty, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [successId, setSuccessId] = useState(null);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, 'orders'), {
      ...form,
      items: cart.map(item => ({
        name: item.name,
        price: item.price,
        qty: item.qty,
      })),
      total: totalAmount,
      createdAt: serverTimestamp(),
      status: 'pending',
    });
    setSuccessId(docRef.id);
    toast.success('✅ Order placed!');
    clearCart();
  };

  return (
    <>
      <Navbar />
      <div className='bg-gradient-to-b from-white via-green-100 to-white'>
      <div className="pt-28 px-6 max-w-6xl mx-auto pb-20 font-display min-h-screen">
        <h1 className="text-4xl font-extrabold text-green-800 mb-8 text-center">🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Your cart is empty.{' '}
            <a href="/menu" className="text-lime-600 underline">
              Browse menu
            </a>
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Cart Items */}
            <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl shadow-lg p-6 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start border-b pb-5 gap-4"
                >
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
                    </p>
                    <div className="flex gap-3 items-center mt-2">
                      <button
                        onClick={() => changeQty(item.id, item.qty - 1)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2.5 py-1 rounded-full"
                        disabled={item.qty === 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-semibold text-lg">{item.qty}</span>
                      <button
                        onClick={() => changeQty(item.id, item.qty + 1)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2.5 py-1 rounded-full"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      toast.error(`${item.name} removed`);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}

              <div className="text-right pt-2">
                <p className="text-xl font-bold text-gray-800">
                  Total: ₹{totalAmount}
                </p>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">🚚 Delivery Info</h2>

              {successId ? (
                <div className="text-center py-10">
                  <p className="text-green-700 text-xl font-semibold">
                    ✅ Order placed successfully!
                  </p>
                  <p className="text-gray-600 mt-2">
                    Track your order here:
                    <br />
                    <a
                      className="text-blue-600 underline font-medium"
                      href={`/track/${successId}`}
                    >
                      {successId}
                    </a>
                  </p>
                </div>
              ) : (
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
  <input
    className="w-full p-3 border rounded"
    placeholder="Name"
    onChange={(e) => setForm({ ...form, name: e.target.value })}
    required
  />
  <input
    className="w-full p-3 border rounded"
    placeholder="Phone"
    onChange={(e) => setForm({ ...form, phone: e.target.value })}
    required
  />
  <textarea
    className="w-full p-3 border rounded"
    placeholder="Address"
    onChange={(e) => setForm({ ...form, address: e.target.value })}
    required
  />
  <button
    type="button"
    onClick={handleRazorpayPayment}
    className="bg-lime-600 text-white px-6 py-3 rounded hover:bg-lime-700 transition w-full"
  >
    💳 Pay & Place Order
  </button>
</form>

              )}
            </div>
          </div>
        )}
      </div>
      </div>
      <Footer />
    </>
  );
}
