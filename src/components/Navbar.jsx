import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../Context/Context";

const Navbar = ({ selectedCategory, setSelectedCategory }) => {
  const { cart } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategories, setShowCategories] = useState(false);

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

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat === "All" ? "" : cat);
    setShowCategories(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav
      style={{
        background: "white",
        borderBottom: "1px solid hsl(214, 32%, 91%)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        padding: "0.75rem 0",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1rem",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "1.2rem",
            color: "hsl(243, 75%, 59%)",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontSize: "1.4rem" }}>🛒</span>
          ShopEase
        </Link>

        {/* Nav Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.4rem 0.75rem",
              borderRadius: "0.5rem",
              textDecoration: "none",
              color: "hsl(215, 28%, 12%)",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(210, 40%, 95%)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            🏠 Home
          </Link>

          {/* Categories Dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowCategories(!showCategories)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.4rem 0.75rem",
                borderRadius: "0.5rem",
                border: "none",
                background: "transparent",
                color: "hsl(215, 28%, 12%)",
                fontSize: "0.9rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(210, 40%, 95%)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              📦 Categories ▾
            </button>
            {showCategories && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 4px)",
                  left: 0,
                  background: "white",
                  border: "1px solid hsl(214, 32%, 91%)",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  minWidth: "160px",
                  zIndex: 200,
                }}
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "0.5rem 1rem",
                      border: "none",
                      background: "transparent",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      color: "hsl(215, 28%, 12%)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(210, 40%, 95%)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/add-product"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.4rem 0.75rem",
              borderRadius: "0.5rem",
              textDecoration: "none",
              color: "hsl(215, 28%, 12%)",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(210, 40%, 95%)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            ➕ Add Product
          </Link>

          <Link
            to="/order"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.4rem 0.75rem",
              borderRadius: "0.5rem",
              textDecoration: "none",
              color: "hsl(215, 28%, 12%)",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(210, 40%, 95%)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            📋 Orders
          </Link>
        </div>

        {/* Search + Cart */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginLeft: "auto" }}>
          <form onSubmit={handleSearch} style={{ display: "flex" }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: "0.4rem 0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid hsl(214, 32%, 91%)",
                fontSize: "0.875rem",
                outline: "none",
                width: "200px",
                color: "hsl(215, 28%, 12%)",
              }}
            />
          </form>

          <Link
            to="/cart"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 1rem",
              borderRadius: "0.5rem",
              textDecoration: "none",
              background: "hsl(243, 75%, 59%)",
              color: "white",
              fontSize: "0.9rem",
              fontWeight: 500,
              position: "relative",
            }}
          >
            🛒 Cart
            {cartCount > 0 && (
              <span
                style={{
                  background: "#ef4444",
                  color: "white",
                  borderRadius: "9999px",
                  fontSize: "0.7rem",
                  padding: "0 0.4rem",
                  fontWeight: 700,
                  minWidth: "1.2rem",
                  textAlign: "center",
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
