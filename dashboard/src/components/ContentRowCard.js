import React from "react";
import PropTypes from "prop-types";

function ContentRowMovieCard(prop) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 py-2 card-body-urban">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div
                className="text-xs font-weight-bold  text-uppercase mb-1"
              >
                {prop.titulo}
              </div>
              <div className="h5 mb-0 font-weight-bold">
                {prop.cifra}
              </div>
            </div>
            <div className="col-auto">
              <i className={`fa-solid ${prop.icono} fa-2x text-gray-300`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ContentRowMovieCard.propTypes = {
  titulo: PropTypes.string.isRequired,
  cifra: PropTypes.number.isRequired,
  icono: PropTypes.string.isRequired,
};

ContentRowMovieCard.defaultProps = {
  titulo: "Not defined",
  cifra: 0,
  icono: "fa-circle-exclamation",
};

export default ContentRowMovieCard;
