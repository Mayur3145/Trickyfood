'use client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import healthyfood from '../../public/healthyfood.json';

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-green-100 via-green-50 to-blue-50 text-center font-display">
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* Text Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left max-w-xl"
          >
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              Fuel Up, <span className="text-lime-600">Stay Fit.</span>
            </h1>
            <p className="text-gray-600 mt-4 text-lg">
              Power-packed bowls, wraps & smoothies crafted for gym goals and Gen Z cravings. Delivered fresh. 💪
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="/menu"
                className="px-6 py-3 bg-lime-600 text-white rounded-full hover:bg-lime-700 shadow-lg transition"
              >
                Explore Menu
              </a>
              <a
                href="/cart"
                className="px-6 py-3 border border-lime-600 text-lime-600 rounded-full hover:bg-lime-100 transition"
              >
                View Cart
              </a>
            </div>
          </motion.div>

          {/* Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <Lottie animationData={healthyfood} loop autoplay />
          </motion.div>
        </div>
      </section>

      {/* Popular Picks Section */}
      <section className="px-6 py-20 bg-white">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-900 text-center mb-10"
        >
          🔥 Trending Picks for Fit Foodies
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((id) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-xl border hover:shadow-2xl transition hover:scale-[1.02] overflow-hidden"
            >
              <img
                src={`https://foodish-api.com/api/images/pizza/pizza${id}.jpg`}
                className="rounded-t-xl h-48 w-full object-cover"
                alt="item"
              />
              <div className="p-5 text-left">
                <h3 className="text-xl font-semibold text-gray-800">Power Wrap #{id}</h3>
                <p className="text-sm text-gray-500 mt-1">Packed with grilled protein, crunchy greens, zero guilt.</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lime-600 font-bold text-lg">₹150</span>
                  <span className="bg-lime-100 text-lime-700 text-xs px-3 py-1 rounded-full">
                    ⭐ 4.{id + 1} rated
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-lime-600 py-12 text-center text-white">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold">🎁 ₹50 OFF + Free Delivery</h2>
          <p className="text-white/90 mt-2 text-md">
            Use code <span className="font-bold">WELCOME50</span> — valid this week only!
          </p>
          <a
            href="/menu"
            className="mt-5 inline-block bg-white text-lime-600 font-semibold px-6 py-3 rounded-full hover:bg-lime-100 transition"
          >
            Order Now
          </a>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
