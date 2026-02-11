import React from 'react';

function AuthSection({ user, onLogout, onSignIn, onSignUp }) {
  return (
    <div className="flex items-center gap-4">
      {user ? (
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-700">Willkommen!</p>
            <p className="text-lg font-bold text-red-600">{user.username}</p>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-xl transition-all duration-200"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            onClick={onSignIn}
            className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-8 rounded-xl transition-all duration-200 border-2 border-gray-300"
          >
            Sign In
          </button>
          <button
            onClick={onSignUp}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200"
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
}

export default AuthSection;
