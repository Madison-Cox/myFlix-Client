import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { MenuBar } from '../navbar/navbar.jsx';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateView } from '../profile-view/update-profile';
import './main-view.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedMovie: null,
      user: null,
      favoriteMovies: [],
      Title: "",
    };
  }
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    const { Username, Email, Birthday, FavoriteMovies } = authData.user;

    this.setState({
      user: authData.user.Username,
      email: Email,
      birthday: Birthday,
      favoriteMovies: FavoriteMovies,
      username: Username,
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', Username);
    localStorage.setItem('birthday', Birthday);
    localStorage.setItem('email', Email);
    localStorage.setItem('favoriteMovies', FavoriteMovies);
    this.getMovies(authData.token);

    this.getTitleList(FavoriteMovies);
  }

  getMovieTitle(movieId) {
    const token = localStorage.getItem('token');
    axios.get(`https://movie-scout.herokuapp.com/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        let favList = localStorage.getItem('favList');
        if (favList == null) {
          localStorage.setItem('favList', response.data.Title);
        } else {
          localStorage.setItem('favList', `${favList}, ${response.data.Title}`);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getTitleList(favoriteMovies) {
    if (!favoriteMovies.length > 0) {
      localStorage.setItem('favList', "No Favorite Movies");
    } else {
      favoriteMovies.forEach(movieId => {
        this.getMovieTitle(movieId)
      });
    }
  }

  onRegistration(registered) {
    this.setState({
      registered,
    });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  getMovies(token) {
    axios.get('https://movie-scout.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { selectedMovie, user, registered, Director, Genre } = this.state;
    let { movies } = this.props;
    return (
      <Router>
        <MenuBar user={user} />
        <Row className='justify-content-md-center'>

          <Switch>
            <Route exact path='/' render={() => {
              if (!user) return (<Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>)
              if (movies.length === 0) return <div className='main-view' />;

              return <MoviesList movies={movies} />;
            }} />

            <Route exact path='/register' render={() => {
              if (user) return <Redirect to='/' />
              return <Col lg={8} md={8}>
                <RegistrationView />
              </Col>
            }} />

            <Route exact path='/movies/:movieId' render={({ match, history }) => {
              console.log('test')
              if (!user) return (<Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>)
              if (movies.length === 0) return <div className='main-view' />;

              return (<Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>)
            }} />

            <Route exact path='/genre/:name' render={({ match, history }) => {
              if (!user) return (<Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>)
              if (movies.length === 0) return <div className='main-view' />;

              return (<Col md={8}>
                <GenreView Genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>)
            }} />

            <Route exact path='/director/:name' render={({ match, history }) => {
              if (!user) return (<Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>)
              if (movies.length === 0) return <div className='main-view' />;
              return (<Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name)} onBackClick={() => history.goBack()} />
              </Col>)
            }} />

            <Route exact path='/users/:username' render={() => {
              if (!user) return (<Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              </Col>)
              return (<Col md={8}>
                <ProfileView />
              </Col>)
            }} />

            <Route exact path='/users/:username/update' render={() => {
              if (!user) return (<Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              </Col>)
              return (<Col md={8}>
                <UpdateView />
              </Col>)
            }} />
          </Switch>
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);
