import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState({ category: '', description: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const API_BASE = 'http://localhost:3000';
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const studentId = storedUser?._id;

  useEffect(() => {
    if (!storedUser || storedUser.role !== 'student') {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [studentRes, complaintsRes] = await Promise.all([
          axios.get(`${API_BASE}/api/students/${studentId}`),
          axios.get(`${API_BASE}/api/students/${studentId}/complaints`)
        ]);
        
        setStudent(studentRes.data);
        setComplaints(complaintsRes.data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load data. Please try again.');
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate, studentId, storedUser]);

  const handlePayDues = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${API_BASE}/api/students/pay/${studentId}`);
      setMessage(res.data.message);
      // Refresh student data
      const studentRes = await axios.get(`${API_BASE}/api/students/${studentId}`);
      setStudent(studentRes.data);
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.response?.data?.message || 'Failed to pay dues');
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(`${API_BASE}/api/students/complaint`, {
        studentId,
        ...newComplaint,
      });
      setMessage(res.data.message);
      setNewComplaint({ category: '', description: '' });
      // Refresh complaints
      const complaintsRes = await axios.get(`${API_BASE}/api/students/${studentId}/complaints`);
      setComplaints(complaintsRes.data);
    } catch (err) {
      console.error('Complaint error:', err);
      setError(err.response?.data?.message || 'Failed to submit complaint');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-600 to-gray-100 flex items-center justify-center">
        <div className="text-center p-10 bg-white rounded-lg shadow-md">
          <p className="text-xl">Loading student dashboard...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-600 to-gray-100 flex items-center justify-center">
        <div className="text-center p-10 bg-white rounded-lg shadow-md">
          <p className="text-xl text-red-500">{error || 'Student data not available'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-600 to-gray-100 p-6 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-teal-700">Welcome, {student.name}</h2>
          <button 
            onClick={() => {
              localStorage.removeItem('user');
              navigate('/login');
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <section className="mb-6 p-4 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Hall Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Hall:</strong> {student.hall || 'Not assigned'}</p>
            <p><strong>Room Number:</strong> {student.roomNumber || 'Not assigned'}</p>
          </div>
        </section>

        <section className="mb-6 p-4 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Dues</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p>Room Rent: ₹{student.roomRent || 0}</p>
            <p>Amenity Charges: ₹{student.amenityCharges || 0}</p>
            <p>Mess Charges: ₹{student.messCharges || 0}</p>
            <p className="font-bold">Total Due: ₹{student.totalDue || 0}</p>
          </div>
          <button
            onClick={handlePayDues}
            disabled={isLoading}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:bg-gray-400"
          >
            {isLoading ? 'Processing...' : 'Pay All Dues'}
          </button>
        </section>

        <section className="mb-6 p-4 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Raise a Complaint</h3>
          <form onSubmit={handleComplaintSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Category (e.g., Electrical, Plumbing)"
              value={newComplaint.category}
              onChange={(e) => setNewComplaint({ ...newComplaint, category: e.target.value })}
              required
              className="w-full px-3 py-2 border rounded"
            />
            <textarea
              placeholder="Describe the issue in detail"
              value={newComplaint.description}
              onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
              required
              className="w-full px-3 py-2 border rounded"
              rows="4"
            ></textarea>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:bg-gray-400"
            >
              {isLoading ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </form>
        </section>

        <section className="p-4 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Your Complaints</h3>
          {complaints.length === 0 ? (
            <p>No complaints submitted yet.</p>
          ) : (
            <div className="space-y-3">
              {complaints.map((complaint, index) => (
                <div key={index} className="p-3 border rounded hover:bg-gray-50">
                  <div className="flex justify-between">
                    <strong className="capitalize">{complaint.category}</strong>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      complaint.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {complaint.status}
                    </span>
                  </div>
                  <p className="mt-1">{complaint.description}</p>
                  {complaint.response && (
                    <div className="mt-2 p-2 bg-gray-100 rounded">
                      <p className="text-sm"><strong>Response:</strong> {complaint.response}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {(message || error) && (
          <div className="mt-4 p-3 rounded-md text-sm ${
            message ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }">
            {message || error}
          </div>
        )}
      </div>
    </div>
  );
}