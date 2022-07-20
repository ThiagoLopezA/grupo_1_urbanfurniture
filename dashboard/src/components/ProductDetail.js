import React, { useEffect, useState } from "react";

export default function ProductDetail() {
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch("/products/order/idproducts/DESC/1")
      .then(response => response.json())
      .then(product => setProduct(product.products[0]));
  }, []);
  return (
    <div className="detail__body">
      <h3 className="detail__title">Último Producto</h3>
      {/* <img src={require(`localhost:3030/public/img/products/${product.image}`)} alt="Product" /> */}
      <h3 className="detail__data">
        <span className="detail__title">Nombre: </span>
        {product.name}
      </h3>
      <h3 className="detail__data">
        <span className="detail__title">Precio: </span>${product.price}
      </h3>
      <h3 className="detail__data">
        <span className="detail__title">Descripción: </span>
        {product.description}
      </h3>
    </div>
  );
}
