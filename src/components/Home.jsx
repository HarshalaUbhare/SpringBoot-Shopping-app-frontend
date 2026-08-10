import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PackageX, ShoppingCart, WifiOff } from "lucide-react";
import { toast } from "react-toastify";
import AppContext from "../Context/Context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import unplugged from "../assets/unplugged.png";

const convertBase64ToDataURL = (base64String, mimeType = "image/jpeg") => {
  if (!base64String) return unplugged;
  if (base64String.startsWith("data:") || base64String.startsWith("http")) {
    return base64String;
  }
  return `data:${mimeType};base64,${base64String}`;
};

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await refreshData();
      setLoading(false);
    })();
  }, [refreshData]);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const filteredProducts = selectedCategory
    ? data.filter((product) => product.category === selectedCategory)
    : data;

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <WifiOff className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-lg font-semibold">Something went wrong</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          We couldn't load the products. Please check your connection and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-40 w-full rounded-2xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-9 w-full rounded-lg" />
            </div>
          ))}
        </div>
      ) : !filteredProducts || filteredProducts.length === 0 ? (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <PackageX className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold">No products available</h2>
          <p className="text-sm text-muted-foreground">Try a different category or check back later.</p>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05 } },
          }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {filteredProducts.map((product) => {
            const { id, brand, name, price, productAvailable, imageData, stockQuantity } = product;
            const outOfStock = stockQuantity === 0 || !productAvailable;

            return (
              <motion.div
                key={id}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Link to={`/product/${id}`} className="block h-full">
                  <Card
                    className={`flex h-full flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md ${
                      outOfStock ? "opacity-70" : ""
                    }`}
                  >
                    <div className="flex h-40 items-center justify-center bg-muted/40 p-4">
                      <img
                        src={convertBase64ToDataURL(imageData)}
                        alt={name}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.target.src = unplugged;
                        }}
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1 p-4">
                      <h3 className="line-clamp-1 font-semibold uppercase tracking-tight">{name}</h3>
                      <p className="text-sm italic text-muted-foreground">~ {brand}</p>
                      <div className="mt-auto pt-3">
                        <p className="mb-2 text-lg font-bold">₹{price}</p>
                        <Button
                          className="w-full"
                          disabled={outOfStock}
                          onClick={(e) => handleAddToCart(e, product)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          {stockQuantity !== 0 ? "Add to Cart" : "Out of Stock"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default Home;
