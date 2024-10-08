import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from './Filter/Filter';
import Notiflix from 'notiflix';
import { GlobalStyle } from './GlobalStyle/GlobalStyle';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  };

  addContact = ({ name, number }) => {
    if (!name || !number) {
      return;
    }
    const { contacts } = this.state;
    if (
      contacts.find(
        item =>
          item.name.toLowerCase() === name.toLowerCase() ||
          item.number === number
      )
    ) {
      Notiflix.Notify.failure(`Is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        { name: name, id: nanoid(), number: number },
      ],
    }));
  };

  stateFilter = name => {
    this.setState({
      filter: name,
    });
  };

  filterInput = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(filter)
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== id),
    }));
  };

  render() {
    const filterContact = this.filterInput();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter stateFilter={this.stateFilter} />
        <ContactList
          contacts={filterContact}
          deleteContact={this.deleteContact}
        />
        <GlobalStyle />
      </div>
    );
  }
}
