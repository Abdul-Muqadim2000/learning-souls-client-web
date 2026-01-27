"use client";

import { useEffect, useState } from "react";

export default function ConfigTest() {
  const [config, setConfig] = useState({
    apiUrl: null,
    stripeKey: null,
  });

  useEffect(() => {
    setConfig({
      apiUrl: process.env.NEXT_PUBLIC_API_URL,
      stripeKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Environment Configuration Test</h1>
        
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold text-gray-700">NEXT_PUBLIC_API_URL</h2>
            <p className={`mt-1 p-2 rounded ${config.apiUrl ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {config.apiUrl || '❌ NOT SET'}
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-700">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</h2>
            <p className={`mt-1 p-2 rounded ${config.stripeKey ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {config.stripeKey ? `✅ SET (${config.stripeKey.substring(0, 20)}...)` : '❌ NOT SET'}
            </p>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded">
            <h3 className="font-semibold text-blue-900 mb-2">Status</h3>
            <p className="text-blue-700">
              {config.apiUrl && config.stripeKey 
                ? '✅ All environment variables are configured correctly!' 
                : '❌ Some environment variables are missing. Check your .env.local file and restart the dev server.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
