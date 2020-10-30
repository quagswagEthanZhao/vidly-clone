import React, { Component } from 'react';
import MoviesTable from '../components/moviesTable';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';
import _ from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 3,
    currentPage: 1,
    sortColumn: { path: 'title', order: 'asc' },
  };

  componentDidMount() {
    const genres = [{ key: '', name: 'All Genres' }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleDelet = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    console.log(this.state.movies[index].liked);
    // movies[index] = { ...movies[index] };
    // movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;
    if (count === 0) return <p>There are no movies avalible in DB!</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies; // filtering movie which is being selected
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]); // sort the arry by condition.
    console.log(sortColumn);
    console.log(sorted);
    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            // textProperty="name" //Make the listComponent more flexible
            // valueProperty="_id"
            onItemSelect={this.handGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in our DB!</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelet={this.handleDelet}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
