import React from 'react';
import { MovieCard } from './movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Interstellar', Description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', ImagePath: 'https://i.ytimg.com/vi/uaSYEUugnzE/movieposter_en.jpg' },
        { _id: 2, Title: 'Hook', Description: 'When Captain James Hook kidnaps his children, an adult Peter Pan must return to Neverland and reclaim his youthful spirit in order to challenge his old enemy.', ImagePath: 'https://i.ytimg.com/vi/BqzG17rxAkw/hqdefault.jpg' },
        { _id: 3, Title: 'Goodfellas', Description: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.', ImagePath: 'https://i.ytimg.com/vi/3yWyYhF1Ag0/movieposter_en.jpg' },
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