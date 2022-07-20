import React, { useEffect, useState } from "react";
import RowProducts from "./RowProducts";
import RowUsers from "./RowUsers";

export default function Table({ link, headers, type }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const spinner = (
    <div class="spinner-border" role="status">
      <span class="visually-hidden"></span>
    </div>
  );
  const prop = link.substring(1);

  useEffect(() => {
    fetch(link)
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setData(data[prop]);
      })
      .catch(e => console.log(e));
  }, []);
  return (
    <React.Fragment>
      {loading ? (
        spinner
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                {headers.map(e => {
                  return <th scope="col">{e}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((ele, index) =>
                type === "products" ? (
                  <RowProducts
                    id={ele.idproducts}
                    name={ele.name}
                    price={ele.price}
                    description={ele.description}
                    key={index + ele}
                  />
                ) : (
                  <RowUsers
                    id={ele.idusers}
                    first_name={ele.first_name}
                    last_name={ele.last_name}
                    email={ele.email}
                    key={index + ele}
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      )}
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
