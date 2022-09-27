import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './genre-view.scss';


export class GenreView extends React.Component {
  render() {
    const { Genre, onBackClick } = this.props;

    return (
      <Card className='genre-view'>
        <Card.Header className='genre-view-header'> {Genre.Name} </Card.Header>
        <Card.Body>Description: {Genre.Description}</Card.Body>
        <Card.Footer>
          <Link to={`/`}>
            <Button variant='link'>Back</Button>
          </Link>
        </Card.Footer>
      </Card>
    );
  }
}

GenreView.proptypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};