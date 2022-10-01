import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Container, Card } from 'react-bootstrap';
import FavoriteMovies from './favorite-movies';
import './profile-view.scss';

export class ProfileView extends React.Component {
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
  };

  getMovieTitle() {
    const favoriteMovies = localStorage.getItem('favoriteMovies');

    axios.get('https://movie-scout.herokuapp.com/movies/${movie._id}', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { user, birthday, email, favoriteMovies } = localStorage;

    return (
      <Container>

        <Card className='profile-view'>
          <Card.Body>Username: {user}</Card.Body>
          <Card.Body>Email: {email}</Card.Body>
          <Card.Body>Birthday: {birthday.toString("MM/dd/yyyy")}</Card.Body>
          <Card.Body>Favorite Movies: {favoriteMovies}
          </Card.Body>

          <Card.Footer>
            <Link to={'/'}>
              <Button variant='link'>Back</Button>
            </Link>
            <Link to={`/users/${user}/update`}>
              <Button variant='link'>Update Profile</Button>
            </Link>
            <Link to={`/users/${user}/favoritemovies`}>
              <button variant='link' >Favorite Movies</button>
            </Link>
          </Card.Footer>
        </Card>

      </Container>
    )
  }
}
