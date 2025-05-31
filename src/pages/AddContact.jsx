// Import necessary components from react-router-dom and other parts of the application.
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AddContactForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch("https://playground.4geeks.com/contact/agendas/tonimir10/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        }),
      });

      if (!resp.ok) throw new Error("Failed to save contact to API");

      const newContact = await resp.json();

      // Guardar en el estado global
      dispatch({
        type: "add_contact",
        payload: newContact,
      });

      navigate("/");
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add a new contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Full Name</label>
          <input type="text" name="full_name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <input type="text" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label>Phone</label>
          <input type="text" name="phone" className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-group mb-4">
          <label>Address</label>
          <input type="text" name="address" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Save</button>
      </form>
      <div className="mt-3 text-center">
        <Link to="/">or get back to contacts</Link>
      </div>
    </div>
  );
};





export const Demo = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  return (
    <div className="container">
      <ul className="list-group">
        {/* Map over the 'todos' array from the store and render each item as a list element */}
        {store && store.todos?.map((item) => {
          return (
            <li
              key={item.id}  // React key for list items.
              className="list-group-item d-flex justify-content-between"
              style={{ background: item.background }}> 
              
              {/* Link to the detail page of this todo. */}
              <Link to={"/single/" + item.id}>Link to: {item.title} </Link>
              
              <p>Open file ./store.js to see the global store that contains and updates the list of colors</p>
              
              <button className="btn btn-success" 
                onClick={() => dispatch({
                  type: "add_task", 
                  payload: { id: item.id, color: '#ffa500' }
                })}>
                Change Color
              </button>
            </li>
          );
        })}
      </ul>
      <br />

      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
