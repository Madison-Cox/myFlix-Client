import React from 'react';
import axios from 'axios';
import { Col, Container, Button, Card, Row, Form } from 'react-bootstrap';



export class UpdateView extends React.Component {

  getUser = (token) => {
    axios.get('https://movie-scout.herokuapp.com/users/${Username}', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.FavoritesMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  editUser = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.put('https://movie-scout.herokuapp.com/users/${Username}', {
      Username: this.state.Username,
      Password: this.state.Password,
      Email: this.state.Email,
      Birthday: this.state.Birthday,
    },
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {


        localStorage.setItem('user', this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert('Profile is updated!');
        window.open('/users/${Username}', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onDeleteUser() {
    const token = localStorage.getItem('token');

    axios.delete('https://movie-scout.herokuapp.com/users/${Username}', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        alert('Profile Deleted');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(value) {
    this.setState({
      Username: value,
    });
    this.Username = value;
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
    this.Password = value;
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
    this.Email = value;
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
    this.Birthday = value;
  }

  render() {


    return (
      <Container>
        <Row>
          <Col>
            <Card className='update'>
              <Card.Header>Update Profile</Card.Header>
              <Card.Body>
                <Form className='update-form'
                  onSubmit={(e) =>
                    this.editUser(e,
                      this.Username,
                      this.Password,
                      this.Email,
                      this.Birthday
                    )
                  }>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type='text'
                      name='Username'
                      placeholder='New Username'
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type='password'
                      name='password'
                      placeholder='New Password'
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type='email'
                      name='Email'
                      placeholder='New Email'
                      onChange={(e) => this.setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type='date'
                      name='Birthday'
                      onChange={(e) => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button
                      variant='warning'
                      type='submit'
                      onClick={() => this.editUser()}>Update User</Button>
                    <Button
                      className='delete-button'
                      variant='danger'
                      onClick={() => this.onDeleteUser()}>Delete User</Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}