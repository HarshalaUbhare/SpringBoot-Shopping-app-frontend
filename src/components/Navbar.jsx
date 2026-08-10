import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../Context/Context";

const Navbar = ({ selectedCategory, setSelectedCategory }) => {
  const { cart } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    setMenuOpen(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate("/");
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav style={{
        background: "white",
        borderBottom: "1px solid hsl(214, 32%, 91%)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        {/* Top bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.65rem 1rem",
          maxWidth: "1280px",
          margin: "0 auto",
        }}>
          {/* Logo */}
          <Link to="/" style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "1.15rem",
            color: "hsl(243, 75%, 59%)",
            whiteSpace: "nowrap",
          }}>
            <span>🛒</span>
            ShopEase
          </Link>

          {/* Desktop nav links */}
          <div className="d-none d-md-flex" style={{ alignItems: "center", gap: "0.15rem" }}>
            <NavLink to="/">🏠 Home</NavLink>

            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowCategories(!showCategories)}
                style={navBtnStyle}
                onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(210, 40%, 95%)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                📦 Categories ▾
              </button>
              {showCategories && (
                <DropdownMenu categories={categories} onSelect={handleCategorySelect} />
              )}
            </div>

            <NavLink to="/add-product">➕ Add Product</NavLink>
            <NavLink to="/order">📋 Orders</NavLink>
          </div>

          {/* Desktop search + cart */}
          <div className="d-none d-md-flex" style={{ alignItems: "center", gap: "0.75rem" }}>
            <SearchForm value={searchQuery} onChange={setSearchQuery} onSubmit={handleSearch} />
            <CartLink count={cartCount} />
          </div>

          {/* Mobile: cart icon + hamburger */}
          <div className="d-flex d-md-none" style={{ alignItems: "center", gap: "0.5rem" }}>
            <CartLink count={cartCount} />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "transparent",
                border: "1px solid hsl(214, 32%, 91%)",
                borderRadius: "0.5rem",
                padding: "0.35rem 0.6rem",
                cursor: "pointer",
                fontSize: "1.1rem",
                lineHeight: 1,
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="d-md-none" style={{
            borderTop: "1px solid hsl(214, 32%, 91%)",
            padding: "0.75rem 1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}>
            <MobileNavLink to="/" onClick={() => setMenuOpen(false)}>🏠 Home</MobileNavLink>

            <button
              onClick={() => setShowCategories(!showCategories)}
              style={mobileNavBtnStyle}
            >
              📦 Categories {showCategories ? "▲" : "▾"}
            </button>
            {showCategories && (
              <div style={{ paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: "0.1rem" }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    style={{
                      ...mobileNavBtnStyle,
                      fontSize: "0.85rem",
                      color: "hsl(215, 28%, 30%)",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            <MobileNavLink to="/add-product" onClick={() => setMenuOpen(false)}>➕ Add Product</MobileNavLink>
            <MobileNavLink to="/order" onClick={() => setMenuOpen(false)}>📋 Orders</MobileNavLink>

            <form onSubmit={handleSearch} style={{ marginTop: "0.5rem" }}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.45rem 0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid hsl(214, 32%, 91%)",
                  fontSize: "0.875rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </form>
          </div>
        )}
      </nav>
    </>
  );
};

const navLinkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.35rem",
  padding: "0.4rem 0.7rem",
  borderRadius: "0.5rem",
  textDecoration: "none",
  color: "hsl(215, 28%, 12%)",
  fontSize: "0.875rem",
  fontWeight: 500,
};

const navBtnStyle = {
  ...navLinkStyle,
  border: "none",
  background: "transparent",
  cursor: "pointer",
};

const mobileNavBtnStyle = {
  display: "block",
  width: "100%",
  padding: "0.5rem 0.5rem",
  border: "none",
  background: "transparent",
  textAlign: "left",
  cursor: "pointer",
  fontSize: "0.9rem",
  fontWeight: 500,
  color: "hsl(215, 28%, 12%)",
  borderRadius: "0.4rem",
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    style={navLinkStyle}
    onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(210, 40%, 95%)")}
    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
  <Link to={to} onClick={onClick} style={mobileNavBtnStyle}>
    {children}
  </Link>
);

const SearchForm = ({ value, onChange, onSubmit }) => (
  <form onSubmit={onSubmit} style={{ display: "flex" }}>
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
);

const CartLink = ({ count }) => (
  <Link
    to="/cart"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      padding: "0.4rem 0.9rem",
      borderRadius: "0.5rem",
      textDecoration: "none",
      background: "hsl(243, 75%, 59%)",
      color: "white",
      fontSize: "0.875rem",
      fontWeight: 500,
      whiteSpace: "nowrap",
    }}
  >
    🛒 Cart
    {count > 0 && (
      <span style={{
        background: "#ef4444",
        color: "white",
        borderRadius: "9999px",
        fontSize: "0.7rem",
        padding: "0 0.4rem",
        fontWeight: 700,
        minWidth: "1.2rem",
        textAlign: "center",
      }}>
        {count}
      </span>
    )}
  </Link>
);

const DropdownMenu = ({ categories, onSelect }) => (
  <div style={{
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    background: "white",
    border: "1px solid hsl(214, 32%, 91%)",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    minWidth: "160px",
    zIndex: 200,
  }}>
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => onSelect(cat)}
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
);

export default Navbar;
