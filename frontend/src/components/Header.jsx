import React from 'react';
import AuthSection from './AuthSection';

function Header({ user, onLogout, onSignIn, onSignUp }) {
  return (
    <header className="bg-white shadow-lg border-b-4 border-blue-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
              <Logo />  
            <div className="text-gray-800">
              <h1 className="text-5xl font-bold">
                Lego Set Explorer
              </h1>
              <p className="text-gray-700 mt-3 text-lg font-medium">
                Discover, Search, and Explore Lego Sets from Around the World
              </p>
            </div>
          </div>

          <AuthSection
            user={user}
            onLogout={onLogout}
            onSignIn={onSignIn}
            onSignUp={onSignUp}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
