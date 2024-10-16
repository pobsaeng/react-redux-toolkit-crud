import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, update, remove } from "../rtk/productSlice";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

const ProductComponent = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  const [currentProduct, setCurrentProduct] = useState(null); // Track the product being edited
  const [editMode, setEditMode] = useState(false);

  // Generate next ID for new products
  const getNextId = () => {
    if (products.length === 0) return 1;
    const maxId = Math.max(...products.map((product) => product.id));
    return maxId + 1;
  };

  // Add or update product
  const handleSubmit = (productData) => {
    if (editMode) {
      dispatch(update(productData));
    } else {
      const newId = getNextId();
      dispatch(add({ ...productData, id: newId }));
    }
  };

  // Handle product removal
  const handleRemove = (id) => {
    dispatch(remove(id));
  };

  // Prepare product for editing
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setEditMode(true);
  };

  // Reset editing mode
  const resetEditMode = () => {
    setCurrentProduct(null);
    setEditMode(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Manage Products</h1>
      <ProductForm onSubmit={handleSubmit} currentProduct={currentProduct} resetEditMode={resetEditMode} />
      <ProductList products={products} onRemove={handleRemove} onEdit={handleEdit} />
    </div>
  );
};

export default ProductComponent;
