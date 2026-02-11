import React from 'react';

export default function Logo() {
  return (
    <div className="flex items-center justify-start gap-3 mb-4">
      <img src="/Logo.png" alt="Logo" className="h-24 w-24" />
      <h3 className="text-3xl font-bold text-gray-800">Lego Set Explorer</h3>
      <p className="text-sm text-gray-500">by Syntax</p>
    </div>
  );
};