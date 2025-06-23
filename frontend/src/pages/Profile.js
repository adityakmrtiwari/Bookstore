import React, { useState } from 'react';
import api from '../services/api';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

function Profile({ user, setUser }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: '',
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    console.log('Edit Profile button clicked');
    setEditing(true);
    setError('');
    setSuccess('');
    console.log('Editing state after click:', true);
    console.log('Form data at edit:', formData);
  };

  const handleCancel = () => {
    console.log('Cancel button clicked');
    setEditing(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      confirmPassword: '',
    });
    setError('');
    setSuccess('');
    console.log('Editing state after cancel:', false);
    console.log('Form data after cancel:', formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    console.log('Form submitted');
    console.log('Form data at submit:', formData);
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      console.error('Passwords do not match');
      return;
    }
    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
      };
      if (formData.password) updateData.password = formData.password;
      const { data } = await api.put('/auth/profile', updateData);
      setUser(data.user);
      setSuccess('Profile updated successfully!');
      setEditing(false);
      console.log('Profile updated successfully:', data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-accent-100 to-secondary">
      <Header isAuthenticated={true} user={user} />
      <div className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        <div className="card max-w-md w-full fade-in bg-white/10 backdrop-blur border border-white/20 rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
            {!editing && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEdit}
              >
                Edit Profile
              </button>
            )}
          </div>
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold mb-2">
              {user?.name ? user.name[0].toUpperCase() : user?.email[0].toUpperCase()}
            </div>
            <h2 className="text-2xl font-bold text-primary mb-1">My Profile</h2>
          </div>
          {error && <div className="bg-accent-100 border-l-4 border-primary text-accent-800 p-3 mb-4 rounded fade-in">{error}</div>}
          {success && <div className="bg-accent-100 border-l-4 border-accent-800 text-accent-800 p-3 mb-4 rounded fade-in">{success}</div>}
          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-accent-800 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  className="input-field"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-accent-800 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="input-field"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-accent-800 font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  className="input-field"
                  placeholder="********"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-accent-800 font-medium">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                  className="input-field"
                  placeholder="********"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn btn-primary flex-1" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                <button type="button" className="btn btn-outline flex-1" onClick={handleCancel} disabled={loading}>Cancel</button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <div>
                <span className="block text-accent-800 font-medium">Name</span>
                <span className="block text-lg font-semibold text-primary">{user?.name}</span>
              </div>
              <div>
                <span className="block text-accent-800 font-medium">Email</span>
                <span className="block text-lg font-semibold text-primary">{user?.email}</span>
              </div>
              <div>
                <span className="block text-accent-800 font-medium">Password</span>
                <span className="block text-lg font-semibold text-primary">********</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile; 