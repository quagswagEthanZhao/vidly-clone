import React, { Component } from 'react';
import Like from '../components/common/like';

class MoviesTable extends Component {
  riseSort = (path) => {
    // console.log(this.props.sortColum);
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === 'asc' ? 'dec' : 'asc';
    else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { movies, onDelet, onLike } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.riseSort('title')}>Title</th>
            <th onClick={() => this.riseSort('genre.name')}>Genre</th>
            <th onClick={() => this.riseSort('numberInStock')}>Stock</th>
            <th onClick={() => this.riseSort('dailyRentalRate')}>Rate</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like liked={movie.liked} onClick={() => onLike(movie)} />
              </td>
              <td>
                <button
                  onClick={() => onDelet(movie)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
