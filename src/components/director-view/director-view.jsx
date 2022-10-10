import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';

import './director-view.scss';

export class DirectorView extends React.Component {



  render() {
    const { Director, directorMovies } = this.props;

    return (
      <Container>
        <Card className='dir-view'>
          <Card.Header className='dir-view-header'> {Director.Name} </Card.Header>
          <Card.Body>Bio: <br />{Director.Bio}</Card.Body>
          <Card.Body>Birth: {Director.Birth}</Card.Body>
          <Card.Footer>
            <Link to={`/`}>
              <Button variant='link'>Back</Button>
            </Link>
          </Card.Footer>
        </Card>
        <Row className="justify-content mt-3 director-cardView">
          {directorMovies.map((m) => (
            <MovieCard key={m._id} movie={m}></MovieCard>
          ))}
        </Row>
      </Container>
    );
  }
}

DirectorView.proptypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.number.isRequired
  }).isRequired,
};
