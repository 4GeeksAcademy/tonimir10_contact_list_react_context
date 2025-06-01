// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import rigoImageUrl from "../assets/img/rigo-baby.jpg"  // Import an image asset
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state

export const EditContact = () => {
  const { id } = useParams();
  return(
    <>
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
    </>
  )
}

