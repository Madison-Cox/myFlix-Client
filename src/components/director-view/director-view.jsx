import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import './director-view.scss';
import { propTypes } from 'react-bootstrap/esm/Image';

export class DirectorView extends React.Component {
  render() {
    const { Director, onBackClick, movies, movie } = this.props;

    return (
      <Container>
        <Card className='dir-view'>
          <Card.Header className='dir-view-header'>Director</Card.Header>
          <Card.Body className='dir-view-title'>{Director.Director.Name}</Card.Body>
          <Card.Body>Birth: {Director.Director.Birth}</Card.Body>
          <Card.Body>{Director.Director.Bio}</Card.Body>
          <Card.Footer>
            <Button className='dir-view-button'
              onClick={() => {
                onBackClick();
              }}>Back</Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.number,
  }).isRequired,
};
