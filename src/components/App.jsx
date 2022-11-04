import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import { Box } from 'Box';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './Contacts/ContactList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  const addContact = (name, number) => {
    const newContact = { id: nanoid(), name, number };

    if (contacts.find(contact => contact.name === name)) {
      toast.error(`${name} is already in contacts`);
      return;
    } else {
      setContacts([newContact, ...contacts]);
    }
  };

  const formSubmitHandler = data => {
    console.log('data', data);
    return data;
  };

  const filterContacts = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const getVisibleContacts = () => {
    const normilizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== contactId)
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        mt={5}
        ml={5}
        mr={5}
        pt={4}
        pb={4}
        pl={4}
        pr={4}
        boxShadow="boxShadow"
      >
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={formSubmitHandler}
          addContact={addContact}
        ></ContactForm>
        <ToastContainer />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={filterContacts}></Filter>
        <ContactList
          visibleContacts={getVisibleContacts()}
          deleteContact={deleteContact}
        ></ContactList>
      </Box>
    </ThemeProvider>
  );
};
