"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    profilePic: null, // New state for the profile picture
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState(''); // URL for the uploaded profile picture

  // Fetch existing user data (if applicable)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        setFormData(response.data);
        setProfilePicUrl(response.data.profilePicUrl || '');
      } catch (err) {
        setError('Failed to fetch profile data');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, profilePic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // If a profile picture was selected, upload it
      if (formData.profilePic) {
        const formDataToSend = new FormData();
        formDataToSend.append('profilePic', formData.profilePic);
        const res = await axios.post('/api/user/upload-profile-pic', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Save the profile picture URL to the state
        setProfilePicUrl(res.data.profilePicUrl);
      }

      // Update the rest of the profile data
      await axios.post('/api/user/update-profile', formData);

      // Redirect or show success
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-4">Complete Your Profile</h2>
      {error && <div className="text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center">
          {/* Display existing profile picture or show placeholder */}
          {profilePicUrl ? (
            <img
              src={profilePicUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200"></div>
          )}
        </div>

        <div>
          <label htmlFor="profilePic" className="block">Upload Profile Picture</label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            onChange={handleChange}
            accept="image/*"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="firstName" className="block">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            disabled
          />
        </div>
        <div>
          <label htmlFor="phone" className="block">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="address" className="block">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteProfile;
