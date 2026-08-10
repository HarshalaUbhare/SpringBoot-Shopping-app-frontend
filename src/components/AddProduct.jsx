import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCirclePlus,
  faIndianRupeeSign,
  faImage,
  faCloudArrowUp,
  faCircleInfo,
  faRotate,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
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

const CATEGORIES = [
  "Laptop",
  "Headphone",
  "Mobile",
  "Electronics",
  "Toys",
  "Fashion",
];

const Section = ({ icon, title, children }) => (
  <div className="bg-card rounded-2xl border border-border p-6 mb-4">
    <p className="font-semibold text-sm mb-4 pb-3 border-b border-border flex items-center gap-2">
      <FontAwesomeIcon icon={icon} className="text-primary" />
      {title}
    </p>
    {children}
  </div>
);

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    productAvailable: false,
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [generatingDescription, setGeneratingDescription] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const baseUrl = (import.meta.env.VITE_BASE_URL || "").replace(/\/$/, "");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (!file) {
      setImagePreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
    if (!["image/jpeg", "image/png"].includes(file.type))
      setErrors({ ...errors, image: "JPEG or PNG only" });
    else if (file.size > 5 * 1024 * 1024)
      setErrors({ ...errors, image: "Max 5 MB" });
    else setErrors({ ...errors, image: null });
  };

  const generateDescription = async () => {
    if (!product.name.trim() || !product.category) {
      toast.warning("Please enter product name and select a category first");
      return;
    }

    setGeneratingDescription(true);

    try {
      const response = await axios.post(
        `${baseUrl}/api/product/generate-description`,
        null,
        {
          params: {
            name: product.name,
            category: product.category,
          },
        },
      );

      if (response.data) {
        setProduct({
          ...product,
          description: response.data,
        });
        toast.success("Description generated successfully!");
      }
    } catch (error) {
      console.error("Error generating description:", error);
      if (error.response && error.response.data) {
        toast.error(`Error: ${error.response.data}`);
      } else {
        toast.error("Failed to generate description. Please try again.");
      }
    } finally {
      setGeneratingDescription(false);
    }
  };

  const validate = () => {
    const e = {};
    if (!product.name.trim()) e.name = "Required";
    if (!product.brand.trim()) e.brand = "Required";
    if (!product.description.trim()) e.description = "Required";
    if (!product.price || parseFloat(product.price) <= 0)
      e.price = "Must be > 0";
    if (!product.category) e.category = "Select a category";
    if (product.stockQuantity === "" || parseInt(product.stockQuantity) < 0)
      e.stockQuantity = "Must be ≥ 0";
    if (!image) e.image = "Image is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" }),
    );
    axios
      .post(`${baseUrl}/api/product`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        toast.success("Product added!");
        navigate("/");
      })
      .catch((err) => {
        if (err.response?.data) setErrors(err.response.data);
        else toast.error("Error adding product");
        setLoading(false);
      });
  };
  // Check if AI generation features are available
  const canGenerateDescription = product.name.trim() && product.category;
  const canGenerateImage =
    product.name.trim() && product.category && product.description.trim();

  return (
    <div className="container mx-auto px-4 mt-24 pb-12 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-muted-foreground"
        >
          <Link to="/">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
            Back
          </Link>
        </Button>
        <div>
          <h4 className="text-xl font-bold">Add New Product</h4>
          <p className="text-muted-foreground text-sm">
            Fill in the details to list a product.
          </p>
        </div>
      </div>

      <form onSubmit={submitHandler} noValidate>
        <Section icon={faCircleInfo} title="Basic Information">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Product Name</Label>
              <Input
                name="name"
                placeholder="e.g. MacBook Pro 14"
                value={product.name}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.name && (
                <p className="text-destructive text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <Label>Brand</Label>
              <Input
                name="brand"
                placeholder="e.g. Apple"
                value={product.brand}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.brand && (
                <p className="text-destructive text-xs mt-1">{errors.brand}</p>
              )}
            </div>
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Label>Description</Label>
                <button
                  type="button"
                  className={`btn btn-sm btn-outline-primary ${!canGenerateDescription ? "disabled" : ""}`}
                  onClick={generateDescription}
                  disabled={!canGenerateDescription || generatingDescription}
                  title={
                    !canGenerateDescription
                      ? "Please enter product name and select category first"
                      : "Generate description with AI"
                  }
                >
                  {generatingDescription ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Generating...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-robot me-1"></i>
                      Generate with AI
                    </>
                  )}
                </button>
                <Textarea
                  name="description"
                  placeholder="Describe the product…"
                  value={product.description}
                  onChange={handleChange}
                  className="mt-1 resize-none"
                  rows={3}
                />
                {errors.description && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Section>

        <Section icon={faIndianRupeeSign} title="Pricing & Inventory">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label>Price (₹)</Label>
              <Input
                type="number"
                name="price"
                placeholder="0.00"
                value={product.price}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.price && (
                <p className="text-destructive text-xs mt-1">{errors.price}</p>
              )}
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={product.category}
                onValueChange={(v) => {
                  setProduct({ ...product, category: v });
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
                <p className="text-destructive text-xs mt-1">
                  {errors.category}
                </p>
              )}
            </div>
            <div>
              <Label>Stock Quantity</Label>
              <Input
                type="number"
                name="stockQuantity"
                placeholder="0"
                value={product.stockQuantity}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.stockQuantity && (
                <p className="text-destructive text-xs mt-1">
                  {errors.stockQuantity}
                </p>
              )}
            </div>
          </div>
          <div
            className={`flex items-center gap-4 mt-4 p-4 rounded-xl border transition-colors ${product.productAvailable ? "bg-emerald-50 border-emerald-200" : "bg-muted border-border"}`}
          >
            <Switch
              id="productAvailable"
              checked={product.productAvailable}
              onCheckedChange={(v) =>
                setProduct({ ...product, productAvailable: v })
              }
            />
            <label htmlFor="productAvailable" className="cursor-pointer">
              <p className="font-medium text-sm">Mark as available</p>
              <p className="text-xs text-muted-foreground">
                {product.productAvailable
                  ? "Visible and purchasable"
                  : "Hidden from customers"}
              </p>
            </label>
          </div>
        </Section>

        <Section icon={faImage} title="Product Image">
          <label
            htmlFor="imageUpload"
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all ${imagePreview ? "border-primary/40 bg-accent/20" : "border-border bg-muted/50 hover:border-primary hover:bg-accent/20"}`}
          >
            {imagePreview ? (
              <div className="text-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-44 object-contain rounded-lg mb-3 mx-auto"
                />
                <p className="text-sm text-muted-foreground">
                  <FontAwesomeIcon icon={faRotate} className="mr-1" />
                  Click to change
                </p>
              </div>
            ) : (
              <div className="text-center">
                <FontAwesomeIcon
                  icon={faCloudArrowUp}
                  className="text-3xl text-muted-foreground mb-2"
                />
                <p className="font-medium text-muted-foreground">
                  Click to upload
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPEG or PNG · max 5 MB
                </p>
              </div>
            )}
          </label>
          <input
            id="imageUpload"
            type="file"
            className="hidden"
            accept="image/jpeg,image/png"
            onChange={handleImageChange}
          />
          {errors.image && (
            <p className="text-destructive text-xs mt-2">
              <FontAwesomeIcon icon={faCircleInfo} className="mr-1" />
              {errors.image}
            </p>
          )}
        </Section>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="mr-2 animate-spin"
                />
                Adding…
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCirclePlus} className="mr-2" />
                Add Product
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
