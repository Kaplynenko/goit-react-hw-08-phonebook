import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import authOperations from '../../redux/auth/authOperations';
import s from '../Registration/Registration.module.css';

export default function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(authOperations.register({ name, email, password }));

    reset();
  };

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h1>Registration page</h1>

      <Form onSubmit={handleSubmit} className={s.form} autoComplete="off">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label className={s.label}>
            Your Name
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </Form.Label>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className={s.label}>
            Your E-mail
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </Form.Label>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className={s.label}>
            Create password
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Form.Label>
        </Form.Group>

        <Button type="submit">Sign up</Button>
      </Form>
    </div>
  );
}
