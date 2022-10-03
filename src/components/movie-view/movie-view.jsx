import React from 'react';
import PropTypes, { string } from 'prop-types';
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

  addFavorite = () => {
    const { movie } = this.props;
    axios.post(`https://movie-scout.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movie._id}`, {
      FavoriteMovies: this.state.MovieID
    },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then((response) => {
        if (localStorage.favList.includes(movie.Title)) { //do nothing
        } else if (localStorage.favList.length > 0) {
          localStorage.setItem('favList', `${localStorage.favList}, ${movie.Title}`);
        } else { localStorage.setItem('favList', `${movie.Title}`); }
        const data = response.data;
        console.log(data);
        alert('Movie added from favorites.');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onRemoveFavorite = () => {
    const { movie } = this.props;
    axios.delete(`https://movie-scout.herokuapp.com/users/${localStorage.getItem('user')}/Movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(() => {
        if (!localStorage.favList.includes(movie.Title)) { //do nothing
        } else {
          let array = localStorage.favList.replace(movie.Title, '').split(',');
          var cleaned = array.filter(function (el) {
            if (el != null && el != " ") return el.trim();
          });
          let newString = "";
          for (let i = 0; i < cleaned.length; i++) {
            if (i == 0) {
              newString = cleaned[i].toString();
            } else {
              newString = `${newString}, ${cleaned[i]}`;
            }
          }

          localStorage.setItem('favList', newString);
          alert('Movie removed from favorites.');
        }
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
          {
            localStorage.getItem('favList').includes(movie.Title) ?
              <Button variant='danger' onClick={() => { this.onRemoveFavorite(movie._id, 'Remove') }}>
                Remove from Favorites
              </Button> :
              <Button variant='success' onClick={() => { this.addFavorite(movie._id, 'Add') }}>
                Add to Favorites
              </Button>
          }
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