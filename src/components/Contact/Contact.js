import React from 'react';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import s from './Contact.module.css';

const Contact = ({ name, number, deleteEl, id, editEl }) => {
  return (
    <div>
      <ListGroup.Item className={s.serchEl}>
        {name}: {number}
        <Button
          type="button"
          className={`${s.ripple} ${s.deletBtn}`}
          onClick={() => deleteEl(id)}
        >
          Delete
        </Button>
        <Button
          variant="primary"
          type="button"
          className={`${s.ripple} ${s.deletBtn}`}
          onClick={() => editEl(id)}
        >
          Edit
        </Button>
      </ListGroup.Item>
    </div>
  );
};

Contact.propType = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  deleteEl: PropTypes.func.isRequired,
};

export default Contact;
