import React, { useState, useCallback } from 'react';
import './Add.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddBook() {

  const [data, setData] = useState({
    book_id: "", // Include book_id in state
    title: "",
    author: "",
    price: ""
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeHandler = useCallback((event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
    setSuccessMessage(''); // Clear success message on input change
    setErrorMessage(''); // Clear error message on input change
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8081/books", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) // Convert data to JSON string
      });
  
      if (response.ok) {
        setSuccessMessage("Book added successfully!");
        setErrorMessage('');
        setData({ book_id: "", title: "", author: "", price: "" });
        toast.success("Book added successfully!");
        console.log('Book added successfully'); // Debugging success
      } else {
        const errorData = await response.json();
        setErrorMessage(`Failed to add book: ${errorData.error || 'Unknown error'}`);
        setSuccessMessage('');
        toast.error(`Failed to add book: ${errorData.error || 'Unknown error'}`);
        console.log('Error adding book:', errorData); // Debugging error
      }
    } catch (error) {
      setErrorMessage(`Error adding book: ${error.message}`);
      setSuccessMessage('');
      toast.error(`Error adding book: ${error.message}`);
      console.log('Catch error:', error); // Debugging catch block error
    }
  };

  return (
    <div className="container">
      <div className="paper">
        <h2><center>Add Book</center></h2><br /><br />
        <form onSubmit={onSubmitHandler} className="form">
          <div className="form-group"><br />
            <label>Book ID (optional)</label>
            <input
              type="text"
              name="book_id"
              value={data.book_id}
              onChange={onChangeHandler}
              placeholder="Book ID (if needed)"
            /> <br />
          </div>
          <div className="form-group"><br />
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={onChangeHandler}
              required
            /> <br />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              name="author"
              value={data.author}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="form-group"><br />
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              required
              min="0"
            />
          </div><br /><br />
          <button className='submit-button' type="submit">Add Book</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
