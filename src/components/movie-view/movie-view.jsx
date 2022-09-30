import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
export class MovieView extends React.Component {

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://movie-scout.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addFavorite = (e) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const { movie } = this.props;
    axios.post(`https://movie-scout.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movie._id}`, {
      FavoriteMovies: this.state.MovieID
    },
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert('Movie added from favorites.');
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