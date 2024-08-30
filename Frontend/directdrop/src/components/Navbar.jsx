import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">MyApp</h1>
        </div>

        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">Home</Link>
          <Link to="/about" className="hover:bg-blue-700 px-3 py-2 rounded">About</Link>
          <Link to="/contact" className="hover:bg-blue-700 px-3 py-2 rounded">Contact</Link>
          <Link to="/dashboard" className="hover:bg-blue-700 px-3 py-2 rounded">Dashboard</Link>
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
