// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import rigoImageUrl from "../assets/img/rigo-baby.jpg"  // Import an image asset
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  
  useEffect(() => {
    const contactToEdit = store.contactList.find((c) => c.id === parseInt(id));
    if (contactToEdit) {
      setFormData({
        name: contactToEdit.name || "",
        email: contactToEdit.email || "",
        phone: contactToEdit.phone || "",
        address: contactToEdit.address || "",
      });
    }
  }, [id, store.contactList]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch(`https://playground.4geeks.com/contact/agendas/tonimir10/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!resp.ok) throw new Error("Failed to edit contact in API");

      const updatedContact = await resp.json();

      dispatch({
        type: "update_contact",
        payload: updatedContact,
      });

      navigate("/");
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit contact</h2>
      <div className="form-group mb-3">
        <label>Full Name</label>
        <input
          value={formData.name}
          type="text"
          name="name"
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label>Email</label>
        <input
          value={formData.email}
          type="email"
          name="email"
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label>Phone</label>
        <input
          value={formData.phone}
          type="text"
          name="phone"
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-4">
        <label>Address</label>
        <input
          value={formData.address}
          type="text"
          name="address"
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-primary w-100">
        Save
      </button>

      <div className="mt-3 text-center">
        <Link to="/">or get back to contacts</Link>
      </div>
    </div>
  );
};