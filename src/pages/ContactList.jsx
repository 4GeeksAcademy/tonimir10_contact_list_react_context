import {useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { Link } from "react-router-dom";

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const ContactList = () => {

	const [contactList, setContactList] = useState([]);

	const getContactList = () => {
		fetch('https://playground.4geeks.com/contact/agendas/tonimir10/contacts',{
			 method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); 
        console.log(resp.status); 
        return resp.json(); 
    })
    .then(data => {
        setContactList(data.contacts);
        console.log(data.contacts); 
    })
    .catch(error => {
       
        console.log(error);
		})
	}

	useEffect(() => {
  getContactList();
},
 [])

 const { dispatch } = useGlobalReducer(); // ya está disponible por tu hook

const handleDelete = async (id) => {
  try {
    const resp = await fetch(`https://playground.4geeks.com/contact/agendas/tonimir10/contacts/${id}`, {
      method: "DELETE"
    });

    if (!resp.ok) throw new Error("Error deleting contact from API");

    setContactList(prev => prev.filter(contact => contact.id !== id));

    dispatch({
      type: "delete_contact",
      payload: id
    });

  } catch (error) {
    console.error("Failed to delete contact:", error);
  }
};

	return (
		<>
		<div className="container mt-4">
      <Link to="/add-contact" className="btn btn-success mb-3">
        Add new contact
      </Link>
      <ul className="list-group">
        {contactList.map((contact, index) => (
          <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img src='https://cdn-pro.elsalvador.com/wp-content/uploads/2020/11/RONALDO-NAZARIO-INTER-SPARTAK-EDH-DEPORTES-03.jpg' className="rounded-circle me-3" width="80" height="80" alt="Profile" />
              <div>
                <h5>{contact.name}</h5>
                <p className="mb-0">📍 {contact.address}</p>
                <p className="mb-0">📱 {contact.phone}</p>
                <p className="mb-0">📧 {contact.email}</p>
              </div>
            </div>
			<button onClick={() => handleDelete(contact.id)}>🗑️</button>
			<Link to={`/update-contact/${contact.id}`} className="btn btn-warning ms-2">
      🖋️
      </Link>
            <div>
              
            </div>
          </li>
        ))}
        <li className="list-group-item text-end fw-bold">
          Total de contactos: {contactList.length}
        </li>
      </ul>
    </div>
		</>
	)
}

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
		</div>
	);
}; 