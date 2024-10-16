import React from "react";

const ProductList = ({ products, onRemove, onEdit }) => {
  return (
    <ul className="list-group">
      {products.map((product) => (
        <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
          <span>
            <strong>{product.id}</strong> - {product.name} ({product.amount}) - ${product.price}
          </span>
          <div>
            <button className="btn btn-warning btn-sm mr-2" onClick={() => onEdit(product)}>
              Edit
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => onRemove(product.id)}>
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;