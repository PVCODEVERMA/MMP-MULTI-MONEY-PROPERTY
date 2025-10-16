import { createContext, useContext, useState } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";

const PropertyContext = createContext();

export const useProperty = () => useContext(PropertyContext);

export const PropertyProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  // Fetch all properties
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/properties");
      setProperties(data.properties || data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch properties.");
    } finally {
      setLoading(false);
    }
  };

  // Post a property
  const postProperty = async (propertyData) => {
    try {
      setLoading(true);
      const formData = new FormData();

      Object.entries(propertyData).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((file) => formData.append("images", file));
        } else if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      const { data } = await api.post("/properties", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(data.message || "Property posted successfully!");
      return data.property;
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to post property.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete property by ID
  const deleteProperty = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/properties/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
      toast.success("Property deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PropertyContext.Provider
      value={{
        loading,
        properties,
        fetchProperties,
        postProperty,
        deleteProperty,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};
