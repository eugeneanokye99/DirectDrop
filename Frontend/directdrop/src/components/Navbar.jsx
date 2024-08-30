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
    setIsFilesOpen(prev => !prev);
    if (isProfileOpen) {
      setIsProfileOpen(false);
    }
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(prev => !prev);
    if (isFilesOpen) {
      setIsFilesOpen(false);
    }
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
    <nav className="text-white bg-slate-500 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">DirectDrop</h1>
        </div>


        <div className="hidden md:flex flex-grow justify-center space-x-4">
          <Link to="/" className="px-3 py-2 hover:bg-slate-600 rounded">Home</Link>
          <div className="relative" ref={filesRef}>
            <button
              className="px-3 py-2 flex items-center hover:bg-slate-600 rounded"
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
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg z-10 w-64">
                <Link to="/files/upload" className="block px-4 py-2 text-blue-900 hover:bg-gray-100 rounded-lg m-2">Upload</Link>
                <Link to="/files/shared" className="block px-4 py-2 text-blue-900 hover:bg-gray-100 rounded-lg m-2">Shared with Me</Link>
              </div>
            )}
          </div>
          <div className="relative" ref={profileRef}>
            <button
              className="px-3 py-2 flex items-center hover:bg-slate-600 rounded"
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
              <div className="absolute w-100 left-0 mt-1 bg-white shadow-lg rounded-lg z-10 w-64">
                <Link to="/profile/settings" className="block px-4 py-2 text-blue-900 hover:bg-gray-100 rounded-lg m-2">Settings</Link>
                <Link to="/profile/logout" className="block px-4 py-2 text-blue-900 hover:bg-gray-100 rounded-lg m-2">Logout</Link>
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


      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`} ref={menuRef}>
        <Link to="/" className="block px-4 py-2 hover:bg-slate-600 rounded-lg m-2">Home</Link>
        <Link to="/files/upload" className="block px-4 py-2 hover:bg-slate-600 rounded-lg m-2 ">Upload</Link>
        <Link to="/files/shared" className="block px-4 py-2 hover:bg-slate-600 rounded-lg m-2 ">Shared with Me</Link>
        <Link to="/profile/settings" className="block px-4 py-2 hover:bg-slate-600 rounded-lg m-2">Settings</Link>
        <Link to="/profile/logout" className="block px-4 py-2 hover:bg-slate-600 rounded-lg m-2 mb-2 ">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
