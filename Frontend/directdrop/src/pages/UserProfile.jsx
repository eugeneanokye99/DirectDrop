import React from 'react';
import { PencilIcon, TrashIcon, ShareIcon } from '@heroicons/react/24/solid';

const UserProfile = () => {
  // Hardcoded user data
  const userInfo = {
    username: 'JohnDoe123',
    displayName: 'John Doe',
    email: 'johndoe@example.com',
    profilePicture: 'https://via.placeholder.com/150',
    status: 'Online',
    reputation: '4.8 / 5',
    uploadedFiles: [
      { name: 'Project Report.pdf', size: '1.2MB', date: '2024-09-12', downloads: 12, status: 'Public' },
      { name: 'Vacation Photos.zip', size: '45MB', date: '2024-08-22', downloads: 5, status: 'Private' },
    ],
    sharedWithMe: [
      { name: 'Design Mockup.png', size: '2.5MB', date: '2024-09-10', from: 'Alice', status: 'View Only' },
    ],
    downloadedFiles: [
      { name: 'Final Exam Notes.docx', size: '5.4MB', date: '2024-07-15', rating: 4.5 },
    ],
  };

  const statusColor = userInfo.status === 'Online' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* User Profile Header */}
      <div className="text-center mb-8">
        <img src={userInfo.profilePicture} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
        <h1 className="text-2xl font-bold">{userInfo.displayName}</h1>
        <p className="text-lg text-gray-500">
          @{userInfo.username} &bull; <span className={`font-semibold ${statusColor}`}>{userInfo.status}</span>
        </p>
        <p className="text-gray-600 mt-2">Reputation: {userInfo.reputation}</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-4">
        {/* My Files */}
        <div className="p-4 border rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">My Files</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 text-left">File Name</th>
                <th className="border p-2 text-left">Size</th>
                <th className="border p-2 text-left">Date Uploaded</th>
                <th className="border p-2 text-left">Downloads</th>
                <th className="border p-2 text-left">Status</th>

              </tr>
            </thead>
            <tbody>
              {userInfo.uploadedFiles.map((file, index) => (
                <tr key={index}>
                  <td className="border p-2">{file.name}</td>
                  <td className="border p-2">{file.size}</td>
                  <td className="border p-2">{file.date}</td>
                  <td className="border p-2">{file.downloads}</td>
                  <td className="border p-2">
                    <span className={`px-2 py-1 rounded ${file.status === 'Public' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                      {file.status}
                    </span>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Shared With Me */}
          <div className="p-4 border rounded-md shadow-md">
            <h2 className="text-sm font-semibold mb-4">Files Shared With Me</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left text-sm">File Name</th>
                  <th className="border p-2 text-left text-sm">Size</th>
                  <th className="border p-2 text-left text-sm">Date</th>
                  <th className="border p-2 text-left text-sm">Shared By</th>
                  <th className="border p-2 text-left text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {userInfo.sharedWithMe.map((file, index) => (
                  <tr key={index}>
                    <td className="border p-2 text-sm">{file.name}</td>
                    <td className="border p-2 text-sm">{file.size}</td>
                    <td className="border p-2 text-sm">{file.date}</td>
                    <td className="border p-2 text-sm">{file.from}</td>
                    <td className="border p-2">
                      <span className="px-2 py-1 text-sm rounded bg-blue-200 text-blue-800">{file.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Download History */}
          <div className="p-4 border rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Download History</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left">File Name</th>
                  <th className="border p-2 text-left">Size</th>
                  <th className="border p-2 text-left">Date Downloaded</th>
                  <th className="border p-2 text-left">Rating</th>
                </tr>
              </thead>
              <tbody>
                {userInfo.downloadedFiles.map((file, index) => (
                  <tr key={index}>
                    <td className="border p-2">{file.name}</td>
                    <td className="border p-2">{file.size}</td>
                    <td className="border p-2">{file.date}</td>
                    <td className="border p-2">
                      <span className="px-2 py-1 rounded bg-yellow-200 text-yellow-800">{file.rating} / 5</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
