import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import contactsOperations from 'redux/contacts/phone-operations';

export default function ShowModal({ show, handleClose, editableItem }) {
  const [contact, setContact] = useState({
    id: editableItem.id,
    name: editableItem.name,
    number: editableItem.number,
  });
  const arrayContact = useSelector(state => state.contacts);
  const dispatch = useDispatch();
  const editContact = data => dispatch(contactsOperations.editContact(data));

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setContact(prevState => ({
          ...prevState,
          [name]: value,
        }));
        break;

      case 'number':
        setContact(prevState => ({
          ...prevState,
          [name]: value,
        }));
        break;

      default:
        return;
    }
  };

  const handleChangeSubmit = event => {
    event.preventDefault();

    const eventNameValue = contact.name;
    const arrayContactNormalaise = arrayContact.contacts.map(e =>
      e.name.toLowerCase().trim()
    );

    const filterName = arrayContactNormalaise.find(
      e => e === eventNameValue.toLowerCase().trim()
    );

    filterName
      ? alert(`${eventNameValue} is already in Contacts`)
      : editContact(contact);

    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div /* className={s.searchForm} */>
            <h2>Name</h2>
            <input
              /* className={s.name} */
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={contact.name}
              onChange={handleChange}
            />

            <h2>Number</h2>
            <input
              /* className={s.number} */
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={contact.number}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cencel
          </Button>
          <Button variant="primary" type="submit" onClick={handleChangeSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
