import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
export class MovieCard extends React.Component {


  getUser = (token) => {
    const Username = localStorage.getItem('user');
    axios.get('https://movie-scout.herokuapp.com/users/${Username}', {
      headers: { Authorization: `Bearer ${token}` },
    })

      .catch(function (error) {
        console.log(error);
      });
  };

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  addFavorite = (e, movie) => {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log(this.props);
    axios.post(`https://movie-scout.herokuapp.com/users/${username}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response);
        alert('Movie added from favorites.');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  render() {
    const { movie } = this.props;

    return (
      <Card>
        <Card.Img variant='top' crossOrigin='anonymous' src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant='link'>Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
};
