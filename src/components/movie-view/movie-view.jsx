import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
export class MovieView extends React.Component {
  addFavorite() {
    const { movie } = this.props;
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const url = `https://movie-scout.herokuapp.com/users/${username}/movies/${movie._id}`;
    console.log(token);

    axios.post(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
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
          <Link to={`/director/${movie.Director.Name}`}>
            <Button variant='link'>Director</Button>
          </Link>
          <Link to={`/genre/${movie.Genre.Name}`}>
            <Button variant='link'>Genre</Button>
          </Link>
          <Link to={`/`}>
            <Button className='BackButton' variant='link'>Back</Button>
          </Link>
          <Button variant='success' onClick={() => { this.addFavorite(movie._id, 'Add') }}>Add to favorites </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
};