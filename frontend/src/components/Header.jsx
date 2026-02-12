import React from 'react';
import Logo from './Logo';
import AuthSection from './AuthSection';

function Header({ user, onLogout, onSignIn, onSignUp }) {
  return (
    <header className="bg-white shadow-lg border-b-4 border-blue-200">
      <div className="container mx-auto px-4 py-8 flex items-center justify-between gap-6">
          <Logo />
          <AuthSection
            user={user}
            onLogout={onLogout}
            onSignIn={onSignIn}
            onSignUp={onSignUp}
          />
      </div>
    </header>
  );
}

export default Header;
