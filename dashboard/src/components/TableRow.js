import React from "react";
import PropTypes from "prop-types";

function TableRow(props) {
  return (
    <React.Fragment>
      <tr>
        <td>{props.titulo}</td>
        <td>{props.duracion}</td>
        <td>{props.rating}</td>
        <td>{props.generos ? props.generos.name : ""}</td>
        <td>{props.premios}</td>
      </tr>
    </React.Fragment>
  );
}

TableRow.propTypes = {
  titulo: PropTypes.string.isRequired,
  duracion: PropTypes.number,
  rating: PropTypes.string.isRequired,
  generos: PropTypes.object,
  premios: PropTypes.number,
};
TableRow.defaultProps = {
  titulo: "Not defined",
  duracion: "Not defined",
  rating: "Not defined",
  generos: "Not defined",
  premios: "Not defined",
};

export default TableRow;
