'use client';
import Link from 'next/link';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const [query, setQuery] = useState('');
  const [menuData, setMenuData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetch('/menu.json')
      .then((res) => res.json())
      .then((data) => setMenuData(data));
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    const matches = menuData.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5); // limit to 5
    setSuggestions(matches);
    setShowDropdown(true);
  }, [query, menuData]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/menu?search=${encodeURIComponent(query.trim())}`);
      setShowDropdown(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-md shadow z-50">
      <nav className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-6 py-4 gap-2 sm:gap-0">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-700">Trickyfood</Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative w-full max-w-md hidden sm:block">
          <input
            type="text"
            ref={inputRef}
            placeholder="Search dishes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition text-sm"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}

          {/* Autocomplete Suggestions */}
          {showDropdown && suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white w-full mt-1 rounded-xl shadow-lg border text-sm overflow-hidden">
              {suggestions.map(item => (
                <li
                  key={item.id}
                  onClick={() => {
                    router.push(`/menu?search=${encodeURIComponent(item.name)}`);
                    setQuery('');
                    setShowDropdown(false);
                  }}
                  className="px-4 py-2 hover:bg-green-50 cursor-pointer text-gray-800"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </form>

        {/* Menu & Cart */}
        <div className="flex items-center gap-6 font-medium">
          <Link href="/menu" className={pathname === '/menu' ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600 transition'}>Menu</Link>
          <Link href="/cart" className="relative">
            <ShoppingCart size={24} className="text-gray-700 hover:text-green-600 transition" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-full shadow">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
