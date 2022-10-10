import React from 'react';
import { Container, Button, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';

export function GenreView({ genre, genreMovies }) {
  return (
    <Container>
      <Card>
        <h1>{genre.Name}</h1>
        <p></p>
        <h5>Description</h5>
        <p>{genre.Description}</p>
        <Card.Footer>
          <Link to={`/`}>
            <Button variant='link'>Back</Button>
          </Link>
        </Card.Footer>
      </Card>
      <Row className="justify-content mt-3 director-cardView">
        {genreMovies.map((m) => (
          <MovieCard key={m._id} movie={m}></MovieCard>
        ))}
      </Row>

    </Container>
  );
}