import React, { useState, useEffect } from "react";

const ProductForm = ({ onSubmit, currentProduct, resetEditMode }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (currentProduct) {
      setName(currentProduct.name);
      setPrice(currentProduct.price.toString());
      setAmount(currentProduct.amount.toString());
    }
  }, [currentProduct]);

  const validateForm = () => {
    if (!name || name.trim() === "") {
      setErrorMessage("Product name cannot be empty.");
      return false;
    }
    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      setErrorMessage("Please enter a valid price.");
      return false;
    }
    if (!amount || isNaN(amount) || parseInt(amount) <= 0) {
      setErrorMessage("Please enter a valid amount.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const productData = {
        id: currentProduct ? currentProduct.id : null,
        name,
        price: parseFloat(price),
        amount: parseInt(amount),
      };
      onSubmit(productData);
      resetForm();
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setAmount("");
    resetEditMode();
  };

  return (
    <div className="card p-4 mb-4">
      <div className="form-group mb-3">
        <label>Product Name</label>
        <input
          type="text"
          className="form-control form-control-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label>Price</label>
        <input
          type="number"
          className="form-control form-control-sm"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label>Amount</label>
        <input
          type="number"
          className="form-control form-control-sm"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <button className="btn btn-primary btn-sm" onClick={handleSubmit}>
        {currentProduct ? "Update" : "Add"}
      </button>
      {currentProduct && (
        <button className="btn btn-secondary btn-sm ml-2" onClick={resetForm}>
          Cancel
        </button>
      )}
    </div>
  );
};

export default ProductForm;
