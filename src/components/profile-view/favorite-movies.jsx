import React from 'react'
import { Link } from 'react-router-dom';
import { Col, Row, Figure, Button, Card } from 'react-bootstrap';
import './profile-view.scss'
import axios from 'axios';

export class FavoriteMovies extends React.Component {
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getFavMovies(token) {
    axios.get(`https://movie-scout.herokuapp.com/users/${localStorage.getItem('user')}`, {
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

  removeFav = (e) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const { movie } = this.props;
    axios.delete(`https://movie-scout.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movie.id}`, {
      FavoriteMovies: this.state.MovieID
    },
      {
        headers: { Authorization: `Bearer ${token}` }
      })
  }

  render() {
    const { favoriteMovies } = localStorage;
    return (
      <Card>
        <Card.Body>
          <Row>
            <Col xs={12}>
              <h4>Favorite Movies</h4>
            </Col>
          </Row>
          <Row>
            {
              !favoriteMovies ? <Col xs={12}> No Favorite Movies </Col> :
                favoriteMovies.map((mList) => {
                  return (
                    <Col xs={12} md={6} lg={3} key={mList.MovieId} className='fav-movie'>
                      <Figure>
                        <Link to={`/movies/${mList.MovieId}`}>
                          <Figure.Image
                            src={mList.ImagePath}
                            alt={mList.Title}
                          />
                          <Figure.Caption>
                            {mList.Title}
                          </Figure.Caption>
                        </Link>
                      </Figure>
                      <Button variant='secondary' onClick={() => removeFav(mList.MovieId)}>Remove</Button>
                    </Col>
                  )
                })
            }
          </Row>
        </Card.Body>
      </Card>
    )
  }
}