import React, { Component } from "react";
import TableRow from "./TableRow";

class Table extends Component {
  constructor() {
    super();
    this.state = {
      moviesList: [],
    };
  }
  componentDidMount() {
    fetch("/api/movies")
      .then(response => response.json())
      .then(movies => this.setState({ moviesList: movies.data }))
      .catch(error => console.log(error));
  }
  render() {
    return (
      <React.Fragment>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Titulo</th>
              <th scope="col">Duración</th>
              <th scope="col">Rating</th>
              <th scope="col">Generos</th>
              <th scope="col">Premios</th>
            </tr>
          </thead>
          <tbody>
            {this.state.moviesList.map((ele, index) => (
              <TableRow
                titulo={ele.title}
                duracion={ele.length}
                rating={ele.rating}
                generos={ele.genre}
                premios={ele.awards}
                key={index + ele}
              />
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Table;
