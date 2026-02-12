import React from 'react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-white border-t-4 border-blue-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Logo />
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Lego Set Explorer. Built with React, Node.js, PostgreSQL & Docker.</p>
          <p className="text-sm text-gray-500">O. Kostina, A. Saboor, A. Sarvari, W. Fonseca</p>
        </div>
      </div>
    </footer>
  );
};
