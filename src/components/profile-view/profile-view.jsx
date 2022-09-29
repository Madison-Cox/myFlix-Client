import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Figure } from 'react-bootstrap';
import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: localStorage.getItem('user'),
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      movies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  onRemoveFavorite = (e, movie) => {
    const username = localStorage.getItem('user');
    console.log(username);
    const token = localStorage.getItem('token');
    console.log(this.props);
    axios.delete('https://movie-scout.herokuapp.com/users/${Username}/Movies/${movie._id}', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response);
        alert('Movie removed from favorites.');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getUser = (token) => {
    const Username = localStorage.getItem('user');
    axios.get('https://movie-scout.herokuapp.com/users/${Username}', {
      headers: { Authorization: `Bearer ${token}` },
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
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });

        localStorage.setItem('user', this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert('Profile is updated');
        window.open('/users/${Username}', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onDeleteUser() {
    const Username = localStorage.getItem('user');
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
    const { user, Birthday, FavoriteMovies, Email } = this.props;
    const Username = localStorage.getItem('user')
    return (
      <Container>
        <Card className='profile-view'>
          <Card.Body>Username: {Username}</Card.Body>
          <Card.Body>Email: {Email}</Card.Body>
          <Card.Body>Birthday: {Birthday}</Card.Body>
          <Card.Footer>
            <Link to={`/`}>
              <Button variant='link'>Back</Button>
            </Link>
            <Link to={'/users/:username/update'}>
              <Button variant='link'>Update Profile</Button>
            </Link>
            <Link to={'/users/:username/favoritemovies'}>
              <Button variant='link'>Favorite Movies</Button>
            </Link>
          </Card.Footer>
        </Card>

      </Container>
    )
  }
}
