import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import s from '../ContactForm/ContactForm.module.css';

import contactsOperations from 'redux/contacts/phone-operations';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const arrayContact = useSelector(state => state.contacts);

  const dispatch = useDispatch();
  const addContact = data => dispatch(contactsOperations.addContact(data));

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const eventNameValue = event.target[0].value;
    const arrayContactNormalaise = arrayContact.contacts.map(e =>
      e.name.toLowerCase().trim()
    );

    const filterName = arrayContactNormalaise.find(
      e => e === eventNameValue.toLowerCase().trim()
    );

    filterName
      ? alert(`${eventNameValue} is already in Contacts`)
      : addContact({ name, number });

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit} className={s.ContactForm}>
      <div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">Please enter your name</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter phone number"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Please enter your phone number
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add contact
        </Button>
      </div>
    </Form>
  );
}

ContactForm.propType = {
  addContact: PropTypes.func.isRequired,
  arrayContact: PropTypes.array.isRequired,
};
