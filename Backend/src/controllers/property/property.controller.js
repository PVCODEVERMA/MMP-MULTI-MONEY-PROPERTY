import Property from "../../models/property.model.js";
import { uploadToCloudinary } from "../../middleware/upload.js";


//  Create Property
export const createProperty = async (req, res) => {
  try {
    const required = [
      "userType",
      "purpose",
      "category",
      "propertyType",
      "title",
      "price",
      "area",
      "address",
      "city",
      "pincode",
      "description",
      "contactNumber",
    ];

    // Validate required fields
    for (let field of required) {
      if (!req.body[field] || req.body[field].trim?.() === "") {
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }

    //  Clean numeric fields
    const cleanNumber = (val) => {
      if (!val) return 0;
      // Remove commas, text, symbols — keep only digits and decimal
      const num = String(val).replace(/[^\d.]/g, "");
      return parseFloat(num) || 0;
    };

    const price = cleanNumber(req.body.price);
    const area = cleanNumber(req.body.area);

    //  Normalize userType (e.g. broker -> Broker)
    const userType =
      req.body.userType.charAt(0).toUpperCase() +
      req.body.userType.slice(1).toLowerCase();

    //  Parse amenities
    let amenities = [];
    if (Array.isArray(req.body.amenities)) {
      amenities = req.body.amenities;
    } else if (req.body.amenities) {
      amenities = String(req.body.amenities)
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean);
    }

    //  Handle image uploads
    let imageUrls = [];
    if (req.files && req.files.length) {
      imageUrls = await Promise.all(
        req.files.map(async (file) => {
          try {
            const upload = await uploadToCloudinary(file.buffer, "properties");
            return upload.secure_url;
          } catch {
            return null;
          }
        })
      );
      imageUrls = imageUrls.filter(Boolean);
    }

    //  Create property
    const property = new Property({
      userType,
      purpose: req.body.purpose,
      category: req.body.category,
      propertyType: req.body.propertyType,
      title: req.body.title,
      price,
      area,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      amenities,
      address: req.body.address,
      city: req.body.city,
      pincode: req.body.pincode,
      floor: req.body.floor,
      totalFloors: req.body.totalFloors,
      description: req.body.description,
      contactNumber: req.body.contactNumber,
      whatsappNumber: req.body.whatsappNumber,
      email: req.body.email,
      availableFrom: req.body.availableFrom,
      images: imageUrls,
      createdAt: new Date(),
    });

    await property.save();

    res.status(201).json({
      message: "Property posted successfully!",
      property,
    });
  } catch (err) {
    console.error("Error creating property:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// ==========================
// Get All Properties
// ==========================
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: properties.length, properties });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching properties" });
  }
};

// ==========================
// Get Property by ID
// ==========================
export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    res.status(200).json({ success: true, property });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching property" });
  }
};

// ==========================
// Delete Property by ID
// ==========================
export const deletePropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByIdAndDelete(id);

    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    res.status(200).json({ success: true, message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting property" });
  }
};
