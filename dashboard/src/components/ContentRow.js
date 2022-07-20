import React, { useState, useEffect } from "react";
import ContentRowMovieCard from "./ContentRowCard";

function ContentRowMovies(props) {
  const [products, setProducts] = useState(0);
  const [users, setUsers] = useState(0);
  const [categories, setCategories] = useState(0);

  useEffect(() => {
    fetch(`/products`)
      .then(response => response.json())
      .then(data => setProducts(data.products.length))
      .then(() => {
        fetch("/products/categories/list")
          .then(response => response.json())
          .then(categories => setCategories(categories.categories.length))
          .then(() => {
            fetch("/users")
              .then(response => response.json())
              .then(users => setUsers(users.users.length));
          });
      });
  }, []);
  const arr = [
    {
      titulo: "Total de productos",
      cifra: products,
      icono: "fa-boxes-stacked",
    },
    {
      titulo: "Total de usuarios",
      cifra: users,
      icono: "fa-user",
    },
    {
      titulo: "Total de categorías",
      cifra: categories,
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
