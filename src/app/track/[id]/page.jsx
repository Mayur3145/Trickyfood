'use client';
import { useParams } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useEffect, useState } from 'react';

export default function TrackOrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'orders', id), (snapshot) => {
      setOrder(snapshot.data());
    });
    return () => unsub();
  }, [id]);

  if (!order) return <p className="text-center pt-28 text-gray-600">Loading order...</p>;

  return (
    <div className="min-h-screen pt-28 px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Order #{id}</h1>
      <p className="mb-2 text-lg">Status: <span className="font-semibold">{order.status}</span></p>
      <p className="text-sm text-gray-600">Placed on: {order.createdAt?.toDate().toLocaleString()}</p>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Items</h2>
        <ul className="space-y-2">
          {order.items.map((item, index) => (
            <li key={index} className="border-b pb-1">{item.name} – ₹{item.price}</li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <iframe
          width="100%"
          height="400"
          loading="lazy"
          style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=trickyfood+Mumbai`}
        ></iframe>
      </div>
    </div>
  );
}
