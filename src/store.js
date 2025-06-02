export const initialStore=()=>{
  return{
    
    contactList:[]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){

    case  'get-contact':
    
    return{
      ...store,
      contactList: action.payload
    };

      case 'add_contact' :
      const newContact = action.payload
      const contactList = [...store.contactList, newContact];
      return{
        ...store,
        contactList
      };

      case 'delete_contact':
        //id = action.payload
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
