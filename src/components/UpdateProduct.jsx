import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ArrowLeft, Image as ImageIcon, IndianRupee, Info, Loader2, RotateCw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Kitchen",
  "Sports",
  "Toys",
  "Beauty",
  "Automotive",
];

const Section = ({ icon: Icon, title, children }) => (
  <div className="bg-card rounded-2xl border border-border p-6 mb-4">
    <p className="font-semibold text-sm mb-4 pb-3 border-b border-border flex items-center gap-2">
      <Icon className="h-4 w-4 text-primary" />
      {title}
    </p>
    {children}
  </div>
);

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = (import.meta.env.VITE_BASE_URL || "").replace(/\/$/, "");

  const [product, setProduct] = useState({});
  const [image, setImage] = useState();
  const [updateProduct, setUpdateProduct] = useState({
    id: null,
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    productAvailable: false,
    stockQuantity: "",
  });
  const [imageChanged, setImageChanged] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/product/${id}`);
        setProduct(response.data);

        const responseImage = await axios.get(`${baseUrl}/api/product/${id}/image`, {
          responseType: "blob",
        });
        const imageFile = new File([responseImage.data], response.data.imageName, {
          type: responseImage.data.type,
        });
        setImage(imageFile);
        setUpdateProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id, baseUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct({ ...updateProduct, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageChanged(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (imageChanged && image) {
      formData.append("imageFile", image);
    }
    formData.append(
      "product",
      new Blob([JSON.stringify(updateProduct)], { type: "application/json" }),
    );

    axios
      .put(`${baseUrl}/api/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        toast.success("Product updated successfully");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        toast.error("Failed to update product. Please try again.");
      })
      .finally(() => {
        setLoading(false);
        navigate("/");
      });
  };

  if (!product.id) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <Skeleton className="h-8 w-56 mb-6" />
        <Skeleton className="h-64 w-full rounded-2xl mb-4" />
        <Skeleton className="h-40 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-24 pb-12 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
        <div>
          <h4 className="text-xl font-bold">Update Product</h4>
          <p className="text-muted-foreground text-sm">Edit the details of this listing.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <Section icon={Info} title="Basic Information">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Product Name</Label>
              <Input
                name="name"
                value={updateProduct.name}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label>Brand</Label>
              <Input
                name="brand"
                value={updateProduct.brand}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.brand && <p className="text-destructive text-xs mt-1">{errors.brand}</p>}
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                name="description"
                value={updateProduct.description}
                onChange={handleChange}
                className="mt-1 resize-none"
                rows={3}
              />
              {errors.description && (
                <p className="text-destructive text-xs mt-1">{errors.description}</p>
              )}
            </div>
          </div>
        </Section>

        <Section icon={IndianRupee} title="Pricing & Inventory">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label>Price (₹)</Label>
              <Input
                type="number"
                name="price"
                value={updateProduct.price}
                onChange={handleChange}
                className="mt-1"
                min="0.01"
                step="0.01"
              />
              {errors.price && <p className="text-destructive text-xs mt-1">{errors.price}</p>}
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={updateProduct.category}
                onValueChange={(v) => {
                  setUpdateProduct({ ...updateProduct, category: v });
                  setErrors({ ...errors, category: null });
                }}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-destructive text-xs mt-1">{errors.category}</p>
              )}
            </div>
            <div>
              <Label>Stock Quantity</Label>
              <Input
                type="number"
                name="stockQuantity"
                value={updateProduct.stockQuantity}
                onChange={handleChange}
                className="mt-1"
                min="0"
              />
              {errors.stockQuantity && (
                <p className="text-destructive text-xs mt-1">{errors.stockQuantity}</p>
              )}
            </div>
          </div>
          <div
            className={`flex items-center gap-4 mt-4 p-4 rounded-xl border transition-colors ${updateProduct.productAvailable ? "bg-emerald-50 border-emerald-200" : "bg-muted border-border"}`}
          >
            <Switch
              id="productAvailable"
              checked={updateProduct.productAvailable}
              onCheckedChange={(v) => setUpdateProduct({ ...updateProduct, productAvailable: v })}
            />
            <label htmlFor="productAvailable" className="cursor-pointer">
              <p className="font-medium text-sm">Mark as available</p>
              <p className="text-xs text-muted-foreground">
                {updateProduct.productAvailable ? "Visible and purchasable" : "Hidden from customers"}
              </p>
            </label>
          </div>
        </Section>

        <Section icon={ImageIcon} title="Product Image">
          <label
            htmlFor="imageUpload"
            className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all border-primary/40 bg-accent/20 hover:border-primary"
          >
            {image ? (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(image)}
                  alt={product.name}
                  className="max-h-44 object-contain rounded-lg mb-3 mx-auto"
                />
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <RotateCw className="h-3.5 w-3.5" />
                  Click to change
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Click to upload an image</p>
            )}
          </label>
          <input
            id="imageUpload"
            type="file"
            className="hidden"
            accept="image/png,image/jpeg"
            onChange={handleImageChange}
          />
          {errors.image && <p className="text-destructive text-xs mt-2">{errors.image}</p>}
          <p className="text-xs text-muted-foreground mt-2">Leave unchanged to keep the current image.</p>
        </Section>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Updating…
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Update Product
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
