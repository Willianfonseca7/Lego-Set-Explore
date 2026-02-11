import React from 'react';
import Logo from './Logo';

function Footer() {
  return (
    <footer className="bg-white border-t-4 border-blue-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-start gap-3 mb-4">
            <Logo />
          </div>
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
            Discover, Search, and Explore Lego Sets from Around the World
          </p>
          <div className="border-t border-gray-200 pt-4 mt-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Lego Set Explorer. Built with React, Node.js, PostgreSQL & Docker.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
