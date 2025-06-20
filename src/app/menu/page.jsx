'use client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Suspense } from 'react';
import MenuContent from '../../components/MenuContent';

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="pt-32 text-center text-gray-400">Loading menu...</div>}>
        <MenuContent />
      </Suspense>
      <Footer />
    </>
  );
}
