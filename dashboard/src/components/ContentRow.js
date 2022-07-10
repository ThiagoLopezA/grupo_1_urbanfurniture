import React from "react";
import ContentRowMovieCard from "./ContentRowCard";

function ContentRowMovies(props) {
  const arr = [
    {
      titulo: "Total de productos",
      cifra: 21,
      icono: "fa-boxes-stacked",
    },
    {
      titulo: "Total de usuarios",
      cifra: 79,
      icono: "fa-user",
    },
    {
      titulo: "Total de categorías",
      cifra: 49,
      icono: "fa-tags",
    },
  ];
  return (
    <>
      <div className="row">
        {arr.map((ele, index) => (
          <ContentRowMovieCard
            titulo={ele.titulo}
            cifra={ele.cifra}
            icono={ele.icono}
            key={index}
          />
        ))}
      </div>
    </>
  );
}
ContentRowMovies.propTypes = {};

export default ContentRowMovies;
