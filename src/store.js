export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    contactList:[]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

      case 'add_contact' :
      const newContact = action.payload
      const contactList = [...store.contactList, newContact];
      return{
        ...store,
        contactList
      };

      case 'delete_contact':
  return {
    ...store,
    contactList: store.contactList.filter(contact => contact.id !== action.payload)
  };

  case 'update_contact':
  const updated = action.payload;

  return {
    ...store,
    contactList: store.contactList.map(contact =>
      contact.id === updated.id ? { ...contact, ...updated } : contact
    )
  };

    default:
      throw Error('Unknown action.');

    
        
  }    
}
