import axios from 'axios';
import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  editContactRequest,
  editContactSuccess,
  editContactError,
} from './phone-actions';

// GET @ /tasks
const fetchContacts = () => async dispatch => {
  dispatch(fetchContactsRequest());

  try {
    const { data } = await axios.get('/contacts');

    dispatch(fetchContactsSuccess(data));
  } catch (error) {
    dispatch(fetchContactsError(error.message));
  }
};

// POST @ /tasks
const addContact = contacts => dispatch => {
  dispatch(addContactRequest());

  axios
    .post('/contacts', contacts)
    .then(({ data }) => dispatch(addContactSuccess(data)))
    .catch(error => dispatch(addContactError(error.message)));
};

// DELETE @ /tasks/:id
const deleteContact = contactId => dispatch => {
  dispatch(editContactRequest());

  axios
    .delete(`/contacts/${contactId}`)
    .then(() => dispatch(deleteContactSuccess(contactId)))
    .catch(error => dispatch(deleteContactError(error.message)));
};

// edit @ /tasks/:id
const editContact =
  ({ id, name, number }) =>
  dispatch => {
    const contact = { name, number };
    dispatch(deleteContactRequest());

    axios
      .patch(`/contacts/${id}`, contact)
      .then(({ data }) => dispatch(editContactSuccess(data)))
      .catch(error => dispatch(editContactError(error.message)));
  };

const contactsOperations = {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
};
export default contactsOperations;
