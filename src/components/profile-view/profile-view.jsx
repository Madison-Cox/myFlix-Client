import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Container, Card } from 'react-bootstrap';
import './profile-view.scss';

export class ProfileView extends React.Component {


  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser = (token) => {
    const Username = localStorage.getItem('user');
    axios.get('https://movie-scout.herokuapp.com/users/${Username}', {
      headers: { Authorization: `Bearer ${token}` },
    })

      .catch(function (error) {
        console.log(error);
      });
  };

  onDeleteUser() {
    axios.delete(`https://movie-scout.herokuapp.com/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
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
  };


  render() {
    const { user, birthday, email, favList } = localStorage;
    return (
      <Container>

        <Card className='profile-view' >
          <Card.Body>Username: {user}</Card.Body>
          <Card.Body>Email: {email}</Card.Body>
          <Card.Body>Birthday: {birthday}</Card.Body>
          <Card.Body>Favorite Movies: {favList}
          </Card.Body>

          <Card.Footer>
            <Link to={'/'}>
              <Button variant='link'>Back</Button>
            </Link>
            <Link to={`/users/${user}/update`}>
              <Button variant='link'>Update Profile</Button>
            </Link>
          </Card.Footer>
        </Card>

      </Container>
    )
  }
}
