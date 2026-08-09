import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../Context/Context";

const Navbar = ({ selectedCategory, setSelectedCategory }) => {
  const { cart } = useContext(AppContext);
  const navigate = useNavigate();

  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Books",
    "Home & Kitchen",
    "Sports",
    "Toys",
    "Beauty",
    "Automotive",
  ];

  const handleCategoryChange = (e) => {
    const value = e.target.value === "All" ? "" : e.target.value;
    setSelectedCategory(value);
    navigate("/");
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-bag-fill me-2"></i>ShopEase
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="mx-auto" style={{ minWidth: "200px" }}>
            <select
              className="form-select"
              value={selectedCategory || "All"}
              onChange={handleCategoryChange}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="bi bi-house me-1"></i>Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-product">
                <i className="bi bi-plus-circle me-1"></i>Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/order">
                <i className="bi bi-list-ul me-1"></i>Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">
                <i className="bi bi-cart3 fs-5"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
