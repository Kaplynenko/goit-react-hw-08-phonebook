import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import s from './SearchForm.module.css';
import actions from '../../redux/contacts/phone-actions';

export default function SearchForm() {
  const value = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  return (
    <>
      <Form.Label htmlFor="inputPassword5" className={s.SearchForm}>
        Find Contacts by Name
      </Form.Label>
      <Form.Control
        type="text"
        id="inputPassword5"
        value={value}
        aria-describedby="passwordHelpBlock"
        onChange={e => dispatch(actions.changeFilter(e.target.value))}
      />
      <Form.Text id="passwordHelpBlock" muted>
        Start typing to find contact you need
      </Form.Text>
    </>
  );
}
