import React, {Fragment,Component} from "react";
import Header from "./components/Header";
import * as MovieAPI from "./lib/MovieAPI";
import Genre from "./components/Genre";
import { Switch, Route } from "react-router-dom";
import Movie from './components/Movie';

class App extends Component {
  state = {
    movieSearch: '',
    movies: [],
    genres: [],
  };

  componentDidMount = () => {
    MovieAPI.getAll().then(movies => this.setState({ movies }));
    
    MovieAPI.genres().then(genres =>
			this.setState({
				genres: genres.sort((a, b) => (a.name < b.name ? -1 : 1)),
			})
		);
	};

  markedTheMovie = props => {
    (props.movie.my_list 
      ? MovieAPI.removeFromList(props.movie)
      : MovieAPI.addToList(props.movie));
    
    MovieAPI.getAll().then((movies) => {
      this.setState({ movies });
    });
  };

  searchForAMovie = (event) => {
    this.setState({ movieSearch: event.target.value }, () => {this.getResults()});
  };

  getResults = () => {
    const movieSearch = this.state.movieSearch;

    const resultsFromMySearch = this.state.movies.filter((movie) =>
        movie.title.toLowerCase().includes(movieSearch.toLowerCase()) ||
        movie.overview.toLowerCase().includes(movieSearch.toLowerCase())
    );
    if (movieSearch !== '') {
      this.setState({ movies: resultsFromMySearch });
    } else {
      MovieAPI.getAll().then((movies) => {
        this.setState({ movies });
      });
    }
  };

  render() {
    return (
      <Fragment>
        <Route exact path='/'>
          <Header
            value={this.state.movieSearch}
            searchAMovie={this.searchForAMovie}
            results={this.state.movies.length}
          />
          <Switch>
            <Route>
              {this.state.genres.map((genre) => (
                <Genre
                  key={genre.id}
                  genre={genre.name}
                  movies={this.state.movies.filter((movie) =>
                    (movie.genre_ids.indexOf(genre.id) > -1)
                  )}
                  markedTheMovie={this.markedTheMovie}
                />
              ))}
            </Route>
            <Route exact path="/mylist">
              <div className="titleList">
                <div className="title">
                  <h1>My List</h1>
                  <div className="titles-wrapper">
                    {this.state.movies.filter((movie) => movie.my_list === true).map((movie) => (
                      <Movie
                        movie={movie}
                        marked={movie.my_list}
                        markedTheMovie={this.markedTheMovie}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Route>
          </Switch>
        </Route>
      </Fragment>
    );
  };
}

export default App;