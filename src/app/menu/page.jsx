'use client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useCart } from '../../context/CartContext';
import menu from '../../data/menu.json';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

export default function MenuPage() {
  const { cart, addToCart, changeQty } = useCart();
  const searchParams = useSearchParams();
  const search = searchParams.get('search')?.toLowerCase() || '';
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const filteredMenu = menu.filter(item =>
    item.name.toLowerCase().includes(search)
  );

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-green-100 via-white to-blue-50">
        <div className="pt-32 px-6 max-w-7xl mx-auto pb-28 font-display min-h-screen">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold text-center text-gray-900 mb-4"
          >
            🥗 Discover Healthy Delights
          </motion.h1>

          <p className="text-center text-gray-500 text-lg mb-12 max-w-2xl mx-auto">
            Fuel your fitness journey with our fresh & protein-rich meals — perfect for gym-lovers and foodies alike.
          </p>

          {filteredMenu.length === 0 ? (
            <p className="text-center text-gray-400 text-lg mt-20">No dishes found for "{search}"</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredMenu.map((item, idx) => {
                const inCart = cart.find(i => i.id === item.id);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-xl hover:scale-[1.015] transition-all overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={`https://foodish-api.com/images/pizza/pizza${(idx % 10) + 1}.jpg`}
                        alt={item.name}
                        className="w-full h-52 object-cover"
                      />
                      <span className="absolute top-3 right-3 bg-white/90 text-lime-600 text-xs px-2 py-1 rounded-full font-semibold shadow">
                        ⭐ {item.rating || '4.5'}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {item.description || 'Clean, macro-balanced and tasty.'}
                      </p>

                      <div className="flex justify-between items-center">
                        <span className="text-lime-600 font-bold text-lg">₹{item.price}</span>

                        {inCart ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => changeQty(item.id, inCart.qty - 1)}
                              className="bg-lime-100 hover:bg-lime-200 text-lime-700 font-bold px-2.5 py-1 rounded-full"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="text-lg font-semibold">{inCart.qty}</span>
                            <button
                              onClick={() => changeQty(item.id, inCart.qty + 1)}
                              className="bg-lime-100 hover:bg-lime-200 text-lime-700 font-bold px-2.5 py-1 rounded-full"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        ) : (
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              addToCart(item);
                              toast.success(`${item.name} added to cart!`);
                            }}
                            className="flex items-center gap-2 bg-lime-600 hover:bg-lime-700 text-white text-sm px-4 py-2 rounded-full shadow-sm transition"
                          >
                            <Plus size={16} /> Add
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Cart Bar (Mobile Only) */}
      {cart.length > 0 && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="fixed bottom-6 left-0 right-0 mx-auto max-w-md px-4 z-50"
        >
          <a
            href="/cart"
            className="flex justify-between items-center bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-green-400/50 transition backdrop-blur"
          >
            <span className="flex items-center gap-2">
              <ShoppingCart size={18} /> View Cart
            </span>
            <span className="font-semibold">₹{total}</span>
          </a>
        </motion.div>
      )}

      <Footer />
    </>
  );
}
