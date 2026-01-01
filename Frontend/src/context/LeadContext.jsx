import { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";

const PropertyContext = createContext();

export const useProperty = () => useContext(PropertyContext);

export const PropertyProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  // 🔐 Auth config (token + credentials)
  const getAuthConfig = (isMultipart = false) => {
    const token = localStorage.getItem("superAdminToken");
    if (!token) return null;

    return {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(isMultipart && { "Content-Type": "multipart/form-data" }),
      },
    };
  };

  // =========================
  // FETCH ALL PROPERTIES
  // =========================
  const fetchProperties = async () => {
    const config = getAuthConfig();
    if (!config) return;

    setLoading(true);
    try {
      const { data } = await api.get("/properties", config);
      setProperties(data?.properties || data || []);
    } catch (err) {
      console.error("❌ Fetch properties error:", err.message);
      toast.error(err.response?.data?.message || "Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // POST PROPERTY (MULTIPART)
  // =========================
  const postProperty = async (propertyData) => {
    const config = getAuthConfig(true);
    if (!config) return null;

    setLoading(true);
    try {
      const formData = new FormData();

      Object.entries(propertyData).forEach(([key, value]) => {
        if (key === "images" && Array.isArray(value)) {
          value.forEach((file) => formData.append("images", file));
        } else if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const { data } = await api.post("/properties", formData, config);

      toast.success(data?.message || "Property posted successfully!");
      fetchProperties();
      return data?.property || null;
    } catch (err) {
      console.error("❌ Post property error:", err.message);
      toast.error(err.response?.data?.message || "Failed to post property");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE PROPERTY
  // =========================
  const deleteProperty = async (id) => {
    const config = getAuthConfig();
    if (!config) return;

    setLoading(true);
    try {
      await api.delete(`/properties/${id}`, config);
      setProperties((prev) => prev.filter((p) => p._id !== id));
      toast.success("Property deleted successfully");
    } catch (err) {
      console.error("❌ Delete property error:", err.message);
      toast.error(err.response?.data?.message || "Failed to delete property");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL FETCH (SAFE)
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("superAdminToken");
    if (token) {
      fetchProperties();
    }
  }, []);

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
