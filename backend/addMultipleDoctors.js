import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

// Load environment variables
dotenv.config({ path: ".env" });

// Doctor data with different profile pictures
const doctors = [
  {
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@curaflow.com",
    phone: "03001234562",
    nic: "1234567890102",
    dob: new Date("1980-05-15"),
    gender: "Female",
    password: "doctor123",
    role: "Doctor",
    doctorDepartment: "Cardiology",
    docAvatar: {
      public_id: "doctor_sarah_johnson",
      url: "http://localhost:4000/dashboard/doc1.jpg"
    }
  },
  {
    firstName: "Dr. Michael",
    lastName: "Chen",
    email: "michael.chen@curaflow.com",
    phone: "03001234563",
    nic: "1234567890103",
    dob: new Date("1975-08-22"),
    gender: "Male",
    password: "doctor123",
    role: "Doctor",
    doctorDepartment: "Neurology",
    docAvatar: {
      public_id: "doctor_michael_chen",
      url: "http://localhost:4000/dashboard/doc2.jpg"
    }
  },
  {
    firstName: "Dr. Emily",
    lastName: "Rodriguez",
    email: "emily.rodriguez@curaflow.com",
    phone: "03001234564",
    nic: "1234567890104",
    dob: new Date("1982-03-10"),
    gender: "Female",
    password: "doctor123",
    role: "Doctor",
    doctorDepartment: "Pediatrics",
    docAvatar: {
      public_id: "doctor_emily_rodriguez",
      url: "http://localhost:4000/dashboard/doc3.jpg"
    }
  },
  {
    firstName: "Dr. James",
    lastName: "Wilson",
    email: "james.wilson@curaflow.com",
    phone: "03001234565",
    nic: "1234567890105",
    dob: new Date("1978-11-30"),
    gender: "Male",
    password: "doctor123",
    role: "Doctor",
    doctorDepartment: "Orthopedics",
    docAvatar: {
      public_id: "doctor_james_wilson",
      url: "http://localhost:4000/dashboard/doc4.jpg"
    }
  },
  {
    firstName: "Dr. Lisa",
    lastName: "Thompson",
    email: "lisa.thompson@curaflow.com",
    phone: "03001234566",
    nic: "1234567890106",
    dob: new Date("1985-07-18"),
    gender: "Female",
    password: "doctor123",
    role: "Doctor",
    doctorDepartment: "Dermatology",
    docAvatar: {
      public_id: "doctor_lisa_thompson",
      url: "http://localhost:4000/dashboard/doc5.jpg"
    }
  },
  {
    firstName: "Dr. David",
    lastName: "Brown",
    email: "david.brown@curaflow.com",
    phone: "03001234567",
    nic: "1234567890107",
    dob: new Date("1973-12-05"),
    gender: "Male",
    password: "doctor123",
    role: "Doctor",
    doctorDepartment: "Oncology",
    docAvatar: {
      public_id: "doctor_david_brown",
      url: "http://localhost:4000/dashboard/doc6.jpg"
    }
  },
  {
    firstName: "Dr. Maria",
    lastName: "Garcia",
    email: "maria.garcia@curaflow.com",
    phone: "03001234568",
    nic: "1234567890108",
    dob: new Date("1981-09-14"),
    gender: "Female",
    password: "doctor123",
    role: "Doctor",
    doctorDepartment: "Radiology",
    docAvatar: {
      public_id: "doctor_maria_garcia",
      url: "http://localhost:4000/dashboard/doc7.jpg"
    }
  },
  {
    firstName: "Dr. Robert",
    lastName: "Taylor",
    email: "robert.taylor@curaflow.com",
    phone: "03001234569",
    nic: "1234567890109",
    dob: new Date("1976-04-25"),
    gender: "Male",
    password: "doctor123",
    role: "Doctor",
    doctorDepartment: "ENT",
    docAvatar: {
      public_id: "doctor_robert_taylor",
      url: "http://localhost:4000/dashboard/doc8.jpg"
    }
  },
  {
    firstName: "Dr. Jennifer",
    lastName: "Anderson",
    email: "jennifer.anderson@curaflow.com",
    phone: "03001234570",
    nic: "1234567890110",
    dob: new Date("1983-01-20"),
    gender: "Female",
    password: "doctor123",
    role: "Doctor",
    doctorDepartment: "Physical Therapy",
    docAvatar: {
      public_id: "doctor_jennifer_anderson",
      url: "http://localhost:4000/dashboard/doc9.jpg"
    }
  },
  {
    firstName: "Dr. Christopher",
    lastName: "Martinez",
    email: "christopher.martinez@curaflow.com",
    phone: "03001234571",
    nic: "1234567890111",
    dob: new Date("1979-06-12"),
    gender: "Male",
    password: "doctor123",
    role: "Doctor",
    doctorDepartment: "Cardiology",
    docAvatar: {
      public_id: "doctor_christopher_martinez",
      url: "http://localhost:4000/dashboard/doc10.jpg"
    }
  }
];

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

// Add multiple doctors to database
const addMultipleDoctors = async () => {
  try {
    await connectDB();
    
    // Create User schema
    const userSchema = new mongoose.Schema({
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      nic: String,
      dob: Date,
      gender: String,
      password: String,
      role: String,
      doctorDepartment: String,
      docAvatar: {
        public_id: String,
        url: String
      }
    });
    
    const User = mongoose.model('User', userSchema);
    
    let addedCount = 0;
    let skippedCount = 0;
    
    for (const doctor of doctors) {
      // Check if doctor already exists
      const existingDoctor = await User.findOne({ email: doctor.email });
      if (existingDoctor) {
        console.log(`⚠️  Doctor ${doctor.firstName} ${doctor.lastName} already exists (${doctor.email})`);
        skippedCount++;
        continue;
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(doctor.password, 10);
      
      // Create doctor
      const newDoctor = new User({
        ...doctor,
        password: hashedPassword
      });
      
      await newDoctor.save();
      console.log(`✅ Added Dr. ${doctor.firstName} ${doctor.lastName} - ${doctor.doctorDepartment} (${doctor.email})`);
      addedCount++;
    }
    
    console.log("\n📊 Summary:");
    console.log(`✅ Successfully added: ${addedCount} doctors`);
    console.log(`⚠️  Skipped (already exist): ${skippedCount} doctors`);
    console.log(`📧 All doctors use password: doctor123`);
    
    mongoose.connection.close();
    console.log("Database connection closed.");
    
  } catch (error) {
    console.error("Error adding doctors:", error);
    mongoose.connection.close();
  }
};

// Run the script
addMultipleDoctors(); 