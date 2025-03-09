import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditTask() {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTaskDetails();
    fetchUsers();
  }, []);

  const fetchTaskDetails = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({
        title: data.title || '',
        description: data.description || '',
        priority: data.priority || 'Medium',
        status: data.status || 'Pending',
        dueDate: data.dueDate ? data.dueDate.split('T')[0] : '',
        category: data.category || '',
        assignedTo: data.assignedTo ? data.assignedTo._id : '',
      });
    } catch (error) {
      console.error('Error fetching task details:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/auth/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (!formData) return <div className="container mt-4"><h2>Loading Task...</h2></div>;

  return (
    <div className="container mt-4">
      <h2>Edit Task</h2>
      <div className="card p-4 shadow">
        <form onSubmit={handleUpdateTask}>
          <input type="text" className="form-control mb-2" placeholder="Title" value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          <textarea className="form-control mb-2" placeholder="Description" value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} required></textarea>
          <select className="form-select mb-2" value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <select className="form-select mb-2" value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <input type="date" className="form-control mb-2" value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} />
          <input type="text" className="form-control mb-2" placeholder="Category" value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
          <select className="form-select mb-2" value={formData.assignedTo}
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}>
            <option value="">Unassigned</option>
            {users.map(user => <option key={user._id} value={user._id}>{user.name}</option>)}
          </select>
          <button type="submit" className="btn btn-primary w-100">Update Task</button>
        </form>
      </div>
    </div>
  );
}

export default EditTask;
