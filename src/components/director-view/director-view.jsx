import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './director-view.scss';


export class DirectorView extends React.Component {
  render() {
    const { director, movie, onBackClick } = this.props;

    return (
      <Card className='dir-view'>
        <Card.Header className='dir-view-header'> {director.Director.Name} </Card.Header>
        <Card.Body>Bio: {director.Director.Bio}</Card.Body>
        <Card.Body>Birth: {director.Director.Birth}</Card.Body>
        <Card.Footer>
          <Link to={`/`}>
            <Button variant='link'>Back</Button>
          </Link>
        </Card.Footer>
      </Card>
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
