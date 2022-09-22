import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

import './registration-view.scss';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegistration(username);
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Form>
                <Form.Group>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type='text'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    placeholder='Enter username'
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength='8'
                    placeholder='Enter Password'
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Enter Email'
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type='birthday'
                    value={birthday}
                    onChange={e => setBirthday(e.target.value)}
                    placeholder='month-date-year'
                  />
                </Form.Group>
                <button variant='primary' type='submit'
                  onClick={handleSubmit}>
                  Submit
                </button>
              </Form>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  )
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};