import { useContext, useState } from "react";
import { Link, NavLink as RouterNavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Home as HomeIcon,
  LogIn,
  LogOut,
  Menu,
  Package,
  PlusCircle,
  Search,
  ShoppingCart,
  Store,
  X,
} from "lucide-react";
import AppContext from "../Context/Context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const CATEGORIES = [
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

const Navbar = ({ selectedCategory, setSelectedCategory, searchQuery, setSearchQuery }) => {
  const { cart, user, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat === "All" ? "" : cat);
    setSearchQuery("");
    setMenuOpen(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/70 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="group flex items-center gap-2.5 text-lg font-bold">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent2 shadow-glow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <Store className="h-5 w-5 text-white" />
            <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-accent2 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-60 -z-10" />
          </span>
          <span className="text-gradient-animated">ShopEase</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <NavItem to="/" active={pathname === "/"}>
            <HomeIcon className="h-4 w-4" />
            Home
          </NavItem>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-white/5 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Package className="h-4 w-4" />
              Categories
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {CATEGORIES.map((cat) => (
                <DropdownMenuItem key={cat} onSelect={() => handleCategorySelect(cat)}>
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <NavItem to="/add-product" active={pathname === "/add-product"}>
            <PlusCircle className="h-4 w-4" />
            Add Product
          </NavItem>
          <NavItem to="/order" active={pathname === "/order"}>
            <Package className="h-4 w-4" />
            Orders
          </NavItem>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <SearchInput value={searchQuery} onChange={setSearchQuery} onSubmit={handleSearch} />
          <CartLink count={cartCount} />
          {user ? (
            <UserMenu user={user} onLogout={logout} />
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm font-medium text-foreground/80 shadow-sm transition-all hover:border-primary/40 hover:bg-white/[0.06]"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <CartLink count={cartCount} />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-lg border border-white/10 bg-white/[0.03] p-2 text-foreground transition-colors hover:bg-white/10"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/[0.06] bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              <MobileNavItem to="/" onClick={() => setMenuOpen(false)}>
                <HomeIcon className="h-4 w-4" />
                Home
              </MobileNavItem>
              <MobileNavItem to="/add-product" onClick={() => setMenuOpen(false)}>
                <PlusCircle className="h-4 w-4" />
                Add Product
              </MobileNavItem>
              <MobileNavItem to="/order" onClick={() => setMenuOpen(false)}>
                <Package className="h-4 w-4" />
                Orders
              </MobileNavItem>

              <p className="mt-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Categories
              </p>
              <div className="grid grid-cols-2 gap-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className="rounded-lg px-3 py-2 text-left text-sm text-foreground/80 transition-colors hover:bg-white/5 hover:text-foreground"
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {user ? (
                <div className="mt-2 flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                  <span className="truncate text-sm font-medium">{user.name || user.email}</span>
                  <button
                    onClick={() => { logout(); setMenuOpen(false); }}
                    className="ml-2 flex items-center gap-1 text-sm text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-white/5"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              )}

              <form onSubmit={handleSearch} className="relative mt-3">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-sm shadow-sm outline-none transition-all focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/50"
                />
              </form>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
};

const NavItem = ({ to, children, active }) => (
  <RouterNavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        isActive ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground"
      )
    }
  >
    {active ? (
      <motion.span
        layoutId="nav-pill"
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-accent2 shadow-glow-sm"
      />
    ) : null}
    <span className="relative z-10 flex items-center gap-1.5">{children}</span>
  </RouterNavLink>
);

const MobileNavItem = ({ to, children, onClick }) => (
  <RouterNavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-white/5 hover:text-foreground",
        isActive && "bg-gradient-to-r from-primary/20 to-accent2/10 text-foreground"
      )
    }
  >
    {children}
  </RouterNavLink>
);

const SearchInput = ({ value, onChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="relative">
    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors peer-focus:text-primary" />
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="peer w-56 rounded-lg border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-sm shadow-sm outline-none transition-all focus-visible:w-64 focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/50"
    />
  </form>
);

const UserMenu = ({ user, onLogout }) => (
  <div className="flex items-center gap-2">
    {user.picture ? (
      <img
        src={user.picture}
        alt={user.name}
        className="h-8 w-8 rounded-full object-cover ring-2 ring-primary/40"
      />
    ) : (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent2 text-xs font-bold text-white shadow-glow-sm">
        {(user.name || user.email || "U")[0].toUpperCase()}
      </div>
    )}
    <button
      onClick={onLogout}
      className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
      title="Logout"
    >
      <LogOut className="h-4 w-4" />
    </button>
  </div>
);

const CartLink = ({ count }) => (
  <Link
    to="/cart"
    className="group relative flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-br from-primary to-accent2 px-3.5 py-2 text-sm font-medium text-white shadow-glow-sm transition-all hover:-translate-y-px hover:shadow-glow active:scale-95"
  >
    <motion.span whileTap={{ rotate: [0, -15, 15, 0] }} className="flex">
      <ShoppingCart className="h-4 w-4" />
    </motion.span>
    <span className="hidden sm:inline">Cart</span>
    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:animate-shine" />
    <AnimatePresence>
      {count > 0 ? (
        <motion.span
          key={count}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="absolute -right-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-destructive px-1 text-[0.7rem] font-bold text-destructive-foreground shadow-sm animate-bounce-in"
        >
          {count}
        </motion.span>
      ) : null}
    </AnimatePresence>
  </Link>
);

export default Navbar;
