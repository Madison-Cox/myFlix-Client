import React from 'react'
import { Link } from 'react-router-dom';
import { Col, Row, Figure, Button, Card } from 'react-bootstrap';
import './profile-view.scss'
import axios from 'axios';
import { render } from 'react-dom';

export function FavoriteMovies({ favoriteMovieList }) {
  const removeFav = (id) => {
    let token = localStorage.getItem('token');
    let url = `https://movie-scout.herokuapp.com/users/${localStorage.getItem('user')}/movies/${id}`;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }


  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h4>Favorite Movies</h4>
          </Col>
        </Row>
        <Row>
          {favoriteMovieList?.map((mList) => {
            return (
              <Col xs={12} md={6} lg={3} key={mList._id} className='fav-movie'>
                <Figure>
                  <Link to={`/movies/${mList._id}`}>
                    <Figure.Image
                      src={mList.ImagePath}
                      alt={mList.Title}
                    />
                    <Figure.Caption>
                      {mList.Title}
                    </Figure.Caption>
                  </Link>
                </Figure>
                <Button variant='secondary' onClick={() => removeFav(mList._id)}>Remove</Button>
              </Col>
            )
          })
          }
        </Row>
      </Card.Body>
    </Card>
  )
}
