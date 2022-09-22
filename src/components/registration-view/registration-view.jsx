import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

import './registration-view.scss';
import axios from 'axios';

export function Registration(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = usestate('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = usestate('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.Registration(username);
  };
  return (
    <Form>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          placeholder='Enter username' />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={e => setPassword(e.target.valule)}
          required
          minLength='8'
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type='birthday'
          value={birthday}
          onChange={e => setBirthday(e.target.value)}
        />
      </Form.Group>
      <button variant='primary' type='submit'
        onClick={handleSubmit}>
        Submit
      </button>
    </Form>
  )
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};