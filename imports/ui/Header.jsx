import React from 'react';

export const Header = () => {
  return (

    <header className="bg-indigo-700">
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-100 lg:border-none">
          <div className="flex items-center">
            <a href="https://www.youtube.com" target="_blank">
              <span className="sr-only"></span>
              <img
                className="h-12 w-auto"
                src="/images/logo.png"
                alt=""
              />
            </a>
            <p className="mx-2 text-2xl text-white">Wallet APP</p>
          </div>
        </div>
      </nav>
    </header>
  )
}