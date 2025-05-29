import { useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const ContactList = () => {

	[contactList, setContactList] = useState([]);

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
        setContactList(data);
        console.log(data); 
    })
    .catch(error => {
       
        console.log(error);
		})
	}

	useEffect(() => {
  getContactList();
},
 [])

	return (
		<>
		<div className="conatiner">
			<div className="contact">
				<ul>
          {contactList.map((contact, index) => (
            <li key={index}>
             {contact.name}
			 <ul>
				<li>{contact.phone}</li>
				<li>{contact.email}</li>
				<li>{contact.address}</li>
			 </ul>
			  <div>
              <button className="done-btn" onClick={() => doneTodo(index)}>🗹</button>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>X</button>
			  </div>
            </li>
          ))}
          <li className="todo-count">Total de contactos: {contactList.length}</li>
        </ul>
			</div>
		
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