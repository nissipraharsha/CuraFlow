import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/userSchema.js";

// Load environment variables
dotenv.config({ path: ".env" });

// New admin data
const newAdmin = {
  firstName: "Default",
  lastName: "Admin",
  email: "admin@gmail.com",
  phone: "03001234561",
  nic: "1234567890101",
  dob: new Date("1985-01-01"),
  gender: "Male",
  password: "123456789",
  role: "Admin",
  docAvatar: {
    public_id: "default_admin_avatar",
    url: "https://res.cloudinary.com/ddosh1myt/image/upload/v1/default_admin_avatar"
  }
};

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "HOSPITAL_MANAGEMENT_SYSTEM",
    });
    console.log("Connected to database!");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

// Add new admin to database
const addNewAdmin = async () => {
  try {
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: newAdmin.email });
    if (existingAdmin) {
      console.log("Admin already exists in database!");
      console.log("Email:", newAdmin.email);
      console.log("Password: 123456789");
      mongoose.connection.close();
      return;
    }
    
    // Add new admin
    const addedAdmin = await User.create(newAdmin);
    
    console.log("✅ Successfully added new admin to the database!");
    console.log("📧 Email:", addedAdmin.email);
    console.log("🔑 Password: 123456789");
    console.log("👤 Role: Admin");
    
    mongoose.connection.close();
    console.log("Database connection closed.");
    
  } catch (error) {
    console.error("Error adding admin:", error);
    mongoose.connection.close();
  }
};

// Run the script
addNewAdmin(); 