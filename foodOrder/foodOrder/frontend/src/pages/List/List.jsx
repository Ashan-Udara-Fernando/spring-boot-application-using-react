import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './List.css';
import './List2.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function List() {
  const [list, setList] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    book_id: '',
    title: '',
    author: '',
    price: ''
  });

  // Fetch the list of books from the backend
  const fetchList = async () => {
    try {
      const response = await axios.get('http://localhost:8081/books');
      setList(response.data);
    } catch (error) {
      toast.error("Error fetching data");
      console.error('Error fetching data:', error);
    }
  };

  // Remove a book item
  const RemoveItem = async (book_id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/books/${book_id}`);
      if (response.status === 200) {
        fetchList(); // Refresh the list after successful deletion
        toast.success("Book removed successfully!");
      } else {
        toast.error("Failed to remove book!");
      }
    } catch (error) {
      toast.error("Error removing book");
      console.error('Error removing book:', error);
    }
  };

  // Update handler
  const UpdateItem = (item) => {
    setEditingItem(item.book_id); // Set the current item being edited
    setFormData({
      book_id: item.book_id,
      title: item.title,
      author: item.author,
      price: item.price
    });
  };

  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8081/books/${formData.book_id}`, formData);
      if (response.status === 200) {
        toast.success("Book updated successfully!");
        fetchList(); // Refresh list after update
        setEditingItem(null); // Clear form after update
      } else {
        toast.error("Failed to update book");
      }
    } catch (error) {
      toast.error("Error updating book");
      console.error('Error updating book:', error);
    }
  };

  // Fetch the list when the component mounts
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list-add-flex-col">
      <ToastContainer />
      <p>All Books List</p>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Book ID</b>
          <b>Title</b>
          <b>Author</b>
          <b>Price</b>
          <b>Actions</b>
        </div>
        {list.map((item) => (
          <div key={item.book_id} className="list-table-format">
            <p>{item.book_id}</p> {/* Display Book ID */}
           
            <p>{item.title}</p>
            <p>{item.author}</p>
            <p>${item.price}</p>
            <div className="actions">
              <button onClick={() => UpdateItem(item)}>Edit</button>
              <button onClick={() => RemoveItem(item.book_id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Conditionally render the update form */}
      {editingItem && (
        <div className="update-form">
          <h3>Update Book Item</h3>
          <form onSubmit={handleUpdateSubmit}>
            <div>
              <label>Book ID:</label>
              <input
                type="text"
                name="book_id"
                value={formData.book_id}
                onChange={handleFormChange}
                disabled
              />
            </div>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Author:</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
                required
                min="0"
              />
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </div>
  );
}
