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
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          placeholder='Enter username' />
      </Form.Group>

      <Label>Password:</Label>

      <input
        type='password'
        value={password}
        onChange={e => setPassword(e.target.valule)} />

      <label>
        Email:
        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)} />
      </label>

      <label>
        Birthday:
        <input
          type='birthday'
          value={birthday}
          onChange={e => setBirthday(e.target.value)} />
      </label>

      <button type='submit' onClick={handleSubmit}>Submit</button>
    </Form>
  )
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};