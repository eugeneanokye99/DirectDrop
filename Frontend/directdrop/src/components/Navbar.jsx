import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="text-blue-900 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">DirectDrop</h1>
        </div>

        <div className="hidden md:flex space-x-4">
          <Link to="/" >Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>

        <button
          className="md:hidden flex items-center px-3 py-2"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <Link to="/" className="block px-4 py-2 text-white hover:bg-blue-700">Home</Link>
        <Link to="/about" className="block px-4 py-2 text-white hover:bg-blue-700">About</Link>
        <Link to="/contact" className="block px-4 py-2 text-white hover:bg-blue-700">Contact</Link>
        <Link to="/dashboard" className="block px-4 py-2 text-white hover:bg-blue-700">Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
