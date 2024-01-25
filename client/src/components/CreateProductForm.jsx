import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateProductForm() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  // add state
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const createProducts = async () => {
    await axios.post("http://localhost:4001/products", {
      name,
      image: imageUrl,
      price,
      description,
      // add category
      category,
    });
    navigate("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createProducts();
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h1>Create Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Image Url
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Enter image url here"
            onChange={(event) => {
              setImageUrl(event.target.value);
            }}
            value={imageUrl}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Price
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price here"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            value={price}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="Enter description here"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            value={description}
            rows={4}
            cols={30}
          />
        </label>
      </div>

      <div className="input-container">
        <label>
          Category
          {/* add onChange */}
          <select
            id="category"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            defaultValue="-- Select a category --"
          >
            <option disabled hidden>
              -- Select a category --
            </option>
            <option value="IT">IT</option>
            <option value="Fashion">Fashion</option>
            <option value="Food">Food</option>
          </select>
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default CreateProductForm;
