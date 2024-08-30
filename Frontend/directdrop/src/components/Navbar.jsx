import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilesOpen, setIsFilesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const filesRef = useRef(null);
  const profileRef = useRef(null);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleFilesDropdown = () => {
    setIsFilesOpen(prev => {
      if (prev) {
        return false; // If Files dropdown is already open, close it
      }
      setIsProfileOpen(false); // Close Profile dropdown if it's open
      return true; // Open Files dropdown
    });
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(prev => {
      if (prev) {
        return false; // If Profile dropdown is already open, close it
      }
      setIsFilesOpen(false); // Close Files dropdown if it's open
      return true; // Open Profile dropdown
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filesRef.current && !filesRef.current.contains(event.target) &&
        profileRef.current && !profileRef.current.contains(event.target) &&
        menuRef.current && !menuRef.current.contains(event.target)
      ) {
        setIsFilesOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="text-white  bg-slate-500 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">DirectDrop</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-grow justify-center space-x-4">
          <Link to="/" className="px-3 py-2 hover:bg-gray-200 rounded">Home</Link>
          <div className="relative" ref={filesRef}>
            <button
              className="px-3 py-2 flex items-center hover:bg-gray-200 rounded"
              onClick={toggleFilesDropdown}
            >
              Files
              {isFilesOpen ? (
                <ChevronUpIcon className="h-5 w-5 ml-2" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 ml-2" />
              )}
            </button>
            {isFilesOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg z-10">
                <Link to="/files/upload" className="block px-4 py-2 text-blue-900 hover:bg-gray-100">Upload</Link>
                <Link to="/files/shared" className="block px-4 py-2 text-blue-900 hover:bg-gray-100">Shared with Me</Link>
              </div>
            )}
          </div>
          <div className="relative" ref={profileRef}>
            <button
              className="px-3 py-2 flex items-center hover:bg-gray-200 rounded"
              onClick={toggleProfileDropdown}
            >
              Profile
              {isProfileOpen ? (
                <ChevronUpIcon className="h-5 w-5 ml-2" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 ml-2" />
              )}
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg z-10">
                <Link to="/profile/settings" className="block px-4 py-2 text-blue-900 hover:bg-gray-100">Settings</Link>
                <Link to="/profile/logout" className="block px-4 py-2 text-blue-900 hover:bg-gray-100">Logout</Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center px-3 py-2"
          onClick={toggleMenu}
          ref={menuRef}
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`} ref={menuRef}>
        <Link to="/" className="block px-4 py-2 hover:bg-gray-200">Home</Link>
        <div className="relative" ref={filesRef}>
          <button
            className="block px-4 py-2 w-full text-left flex items-center hover:bg-gray-200"
            onClick={toggleFilesDropdown}
          >
            Files
            {isFilesOpen ? (
              <ChevronUpIcon className="h-5 w-5 ml-2" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 ml-2" />
            )}
          </button>
          {isFilesOpen && (
            <div className="bg-white shadow-lg rounded-lg">
              <Link to="/files/upload" className="block px-4 py-2 text-blue-900 hover:bg-gray-100">Upload</Link>
              <Link to="/files/shared" className="block px-4 py-2 text-blue-900 hover:bg-gray-100">Shared with Me</Link>
            </div>
          )}
        </div>
        <div className="relative" ref={profileRef}>
          <button
            className="block px-4 py-2 w-full text-left flex items-center hover:bg-gray-200"
            onClick={toggleProfileDropdown}
          >
            Profile
            {isProfileOpen ? (
              <ChevronUpIcon className="h-5 w-5 ml-2" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 ml-2" />
            )}
          </button>
          {isProfileOpen && (
            <div className="bg-white shadow-lg rounded-lg">
              <Link to="/profile/settings" className="block px-4 py-2 text-blue-900 hover:bg-gray-100">Settings</Link>
              <Link to="/profile/logout" className="block px-4 py-2 text-blue-900 hover:bg-gray-100">Logout</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
