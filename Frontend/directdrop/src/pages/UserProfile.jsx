import React from 'react';
import { PencilIcon, ShareIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

const UserProfile = () => {
  const userInfo = {
    username: 'JohnDoe123',
    displayName: 'John Doe',
    email: 'johndoe@example.com',
    profilePicture: 'https://via.placeholder.com/150',
    status: 'Online',
    reputation: '4.8 / 5',
    bio: 'Software Engineer passionate about full-stack development and AI.',
    registrationDate: 'Joined on January 10, 2021',
    uploadedFiles: [
      { name: 'Project Report.pdf', size: '1.2MB', date: '2024-09-12', downloads: 12, status: 'Public' },
      { name: 'Vacation Photos.zip', size: '45MB', date: '2024-08-22', downloads: 5, status: 'Private' },
    ],
    sharedWithMe: [
      { name: 'Design Mockup.png', size: '2.5MB', date: '2024-09-10', from: 'Alice', status: 'View Only' },
      { name: 'Hey There.pdf', size: '5.5MB', date: '2024-10-10', from: 'Lucy', status: 'View Only' },
    ],
  };

  const statusColor = userInfo.status === 'Online' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="max-w-6xl mx-auto p-8">
 
      <div className="text-center mb-8">
        <img
          src={userInfo.profilePicture}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md border-4 border-gray-200"
        />
        <h1 className="text-3xl font-bold">{userInfo.displayName}</h1>
        <p className="text-lg text-gray-500">
          @{userInfo.username} &bull;{' '}
          <span className={`font-semibold ${statusColor}`}>{userInfo.status}</span>
        </p>
        <p className="text-gray-600 mt-2">Reputation: {userInfo.reputation}</p>
      </div>

  
      <div className="bg-slate-900 text-white text-sm shadow-md rounded-lg p-6 mb-8 mx-auto" style={{ maxWidth: '500px' }}>
        <div className="flex justify-between text items-center mb-4">
          <h2 className="text-2xl font-bold">User Information</h2>
          <button className="flex items-center text-blue-500 hover:text-blue-700">
            <PencilSquareIcon className="w-5 h-5 mr-1" />
            <span>Edit Profile</span>
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex space-x-3 text-white">
            <span className="font-semibold ">Email</span>
            <span>{userInfo.email}</span>
          </div>
          <div className="flex space-x-3 text-white">
            <span className="font-semibold">Bio:</span>
            <span>{userInfo.bio}</span>
          </div>
          <div className="flex text-white">
            <span>{userInfo.registrationDate}</span>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="border rounded-lg shadow-md
         bg-white hover:shadow-xl 
         transition-shadow duration-300 ease-in-out">
          <div
            className="flex items-center p-4 text-white rounded-t-lg"
            style={{ backgroundColor: '#f56565' }}
          >
            <PencilIcon className="w-6 h-6 mr-2" />
            <span className="text-lg font-semibold">Uploaded Files</span>
          </div>
          <div className="p-4 text-sm">
            <ul className='p-4'>
              {userInfo.uploadedFiles.map((file, index) => (
                <li key={index} className="mb-4 pb-2 border-b last:border-b-0">
                  <div className="font-semibold text-center mb-1">{file.name}</div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-bold">Size</span>
                    <span  className='text-blue-600 font-semibold'>{file.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-bold">Date</span>
                    <span  className='text-blue-600 font-semibold'>{file.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-bold">Downloads</span>
                    <span  className='text-blue-600 font-semibold'>{file.downloads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-bold">Status</span>
                    <span className='text-blue-600 font-semibold'>{file.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

       
        <div className="border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <div
            className="flex items-center p-4 text-white rounded-t-lg"
            style={{ backgroundColor: '#228B22' }}
          >
            <ShareIcon className="w-6 h-6 mr-2" />
            <span className="text-lg font-semibold">Shared With Me</span>
          </div>
          <div className="p-4 text-sm">
            <ul className='p-4'>
              {userInfo.sharedWithMe.map((file, index) => (
                <li key={index} className="mb-4 pb-2 border-b last:border-b-0">
                  <div className="font-semibold text-center">{file.name}</div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-bold">Size</span>
                    <span className='text-blue-600 font-semibold'>{file.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-bold">Date</span>
                    <span className='text-blue-600 font-semibold'>{file.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-bold">From</span>
                    <span className='text-blue-600 font-semibold'>{file.from}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-bold">Status</span>
                    <span className='text-blue-600 font-semibold'>{file.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default UserProfile;
