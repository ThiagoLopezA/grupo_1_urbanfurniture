import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";

export default function Table() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/products")
      .then((response) => response.json())
      .then((products) => setProducts(products.products))
      .catch((e) => console.log(e));
  }, []);
  return (
    <React.Fragment>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {products.map((ele, index) => (
            <TableRow
              id={ele.idproducts}
              name={ele.name}
              price={ele.price}
              description={ele.description}
              key={index + ele}
            />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

// class Table extends Component {
//   constructor() {
//     super();
//     this.state = {
//       moviesList: [],
//     };
//   }
//   componentDidMount() {
//     fetch("/api/movies")
//       .then(response => response.json())
//       .then(movies => this.setState({ moviesList: movies.data }))
//       .catch(error => console.log(error));
//   }
//   render() {
//     return (
//       <React.Fragment>
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th scope="col">Titulo</th>
//               <th scope="col">Duración</th>
//               <th scope="col">Rating</th>
//               <th scope="col">Generos</th>
//               <th scope="col">Premios</th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.state.moviesList.map((ele, index) => (
//               <TableRow
//                 titulo={ele.title}
//                 duracion={ele.length}
//                 rating={ele.rating}
//                 generos={ele.genre}
//                 premios={ele.awards}
//                 key={index + ele}
//               />
//             ))}
//           </tbody>
//         </table>
//       </React.Fragment>
//     );
//   }
// }
