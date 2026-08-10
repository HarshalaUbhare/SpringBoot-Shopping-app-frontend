import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Pencil, ShoppingCart, Trash2 } from "lucide-react";
import AppContext from "../Context/Context";
import axios from "../axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const Product = () => {
  const { id } = useParams();
  const { addToCart, removeFromCart, refreshData } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const baseUrl = (import.meta.env.VITE_BASE_URL || "").replace(/\/$/, "");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/product/${id}`);
        setProduct(response.data);
        if (response.data.imageName) {
          fetchImage();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async () => {
      const response = await axios.get(`${baseUrl}/api/product/${id}/image`, {
        responseType: "blob",
      });
      setImageUrl(URL.createObjectURL(response.data));
    };
    fetchProduct();
  }, [id, baseUrl]);

  const deleteProduct = async () => {
    try {
      await axios.delete(`${baseUrl}/api/product/${id}`);
      removeFromCart(id);
      toast.success("Product deleted successfully");
      refreshData();
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Product added to cart");
  };

  if (!product) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="h-80 w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    );
  }

  const outOfStock = !product.productAvailable || product.stockQuantity === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-auto max-w-5xl px-4 py-8 sm:px-6"
    >
      <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-muted-foreground" onClick={() => navigate("/")}>
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent p-6 shadow-card"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent2/10" />
          <img
            src={imageUrl}
            alt={product.name}
            className="relative max-h-96 w-full object-contain drop-shadow-2xl"
          />
        </motion.div>

        <div>
          <Badge variant="secondary" className="mb-3">
            {product.category}
          </Badge>

          <h1 className="mb-1 text-2xl font-bold capitalize">{product.name}</h1>
          <p className="mb-4 italic text-muted-foreground">~ {product.brand}</p>

          <div className="mb-4">
            <h3 className="mb-1 text-sm font-semibold">Product Description</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          </div>

          <p className="mb-4 text-3xl font-bold text-gradient">₹{product.price}</p>

          <Button
            size="lg"
            className="mb-4 w-full sm:w-auto"
            disabled={outOfStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            {product.stockQuantity !== 0 ? "Add to Cart" : "Out of Stock"}
          </Button>

          <p className="mb-6 flex items-center gap-2 text-sm">
            Stock Available:{" "}
            <span className={`inline-flex items-center gap-1.5 font-bold ${outOfStock ? "text-destructive" : "text-emerald-400"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${outOfStock ? "bg-destructive" : "bg-emerald-400 animate-pulse"}`} />
              {product.stockQuantity}
            </span>
          </p>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={handleEditClick}>
              <Pencil className="h-4 w-4" />
              Update
            </Button>
            <Button variant="outline" className="text-destructive hover:border-destructive/40 hover:bg-destructive/10" onClick={deleteProduct}>
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Product;
