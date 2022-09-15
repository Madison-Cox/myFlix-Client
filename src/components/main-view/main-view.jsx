import React from 'react';
import { MovieCard } from './movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Interstellar', Description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', ImagePath: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg' },
        { _id: 2, Title: 'Hook', Description: 'When Captain James Hook kidnaps his children, an adult Peter Pan must return to Neverland and reclaim his youthful spirit in order to challenge his old enemy.', ImagePath: 'https://m.media-amazon.com/images/M/MV5BNmJjNTQzMjctMmE2NS00ZmYxLWE1NjYtYmRmNjNiMzljOTc3XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_FMjpg_UX1000_.jpg' },
        { _id: 3, Title: 'Goodfellas', Description: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.', ImagePath: 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg' },
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (selectedMovie) return <MovieView movie={selectedMovie} />;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (<MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }
}

export default MainView;