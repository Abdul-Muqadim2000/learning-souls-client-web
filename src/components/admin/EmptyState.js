import React from "react";
import { PackageOpen } from "lucide-react";

export default function EmptyState({ title, description, icon: Icon = PackageOpen }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white border border-dashed border-gray-300 rounded-xl shadow-sm">
      <div className="w-20 h-20 mb-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
        <Icon size={40} className="text-[var(--color-primary)] opacity-80" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-500 max-w-md mx-auto leading-relaxed">{description}</p>
    </div>
  );
}