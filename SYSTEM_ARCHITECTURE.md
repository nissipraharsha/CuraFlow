# CURAFLOW Hospital Management System - System Architecture

## 🏥 System Overview

CURAFLOW is a comprehensive Hospital Management System designed to streamline healthcare operations, patient management, and administrative tasks. The system provides separate interfaces for patients, doctors, and administrators with role-based access control.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Dashboard     │    │   Backend       │
│   (Patient UI)  │    │   (Admin/Doctor │    │   (API Server)  │
│                 │    │    Interface)   │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   MongoDB       │
                    │   Database      │
                    └─────────────────┘
```

## 📁 Project Structure

```
Hospital-Management-System-Web-Application/
├── frontend/                 # Patient-facing React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── Pages/           # Main page components
│   │   └── config/          # API configuration
│   └── public/              # Static assets
├── dashboard/                # Admin/Doctor React application
│   ├── src/
│   │   ├── components/      # Dashboard components
│   │   └── config/          # API configuration
│   └── public/              # Static assets
├── backend/                  # Node.js/Express API server
│   ├── controller/          # Business logic controllers
│   ├── models/              # MongoDB schemas
│   ├── router/              # API route definitions
│   ├── middlewares/         # Authentication & validation
│   ├── utils/               # Utility functions
│   └── config/              # Environment configuration
└── docs/                    # Documentation
```

## 🔧 Technology Stack

### Frontend Technologies
- **React 18** - UI framework
- **Vite** - Build tool and development server
- **Axios** - HTTP client for API communication
- **React Router** - Client-side routing
- **React Toastify** - Notification system

### Backend Technologies
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Cloudinary** - Image storage

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Development server with auto-reload
- **Dotenv** - Environment variable management

## 🔐 Authentication & Authorization

### User Roles
1. **Patient** - Can book appointments, send messages
2. **Doctor** - Can view appointments, respond to messages
3. **Admin** - Full system access and user management

### Authentication Flow
```
1. User Login → JWT Token Generation
2. Token Storage → HTTP-only Cookies
3. API Requests → Token Validation
4. Role-based Access → Route Protection
```

## 📊 Database Schema

### User Schema
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (unique, required),
  phone: String (required),
  nic: String (required),
  dob: Date (required),
  gender: String (enum: ["Male", "Female"]),
  password: String (hashed, required),
  role: String (enum: ["Patient", "Doctor", "Admin"]),
  doctorDepartment: String (for doctors),
  docAvatar: { public_id: String, url: String }
}
```

### Appointment Schema
```javascript
{
  patient: ObjectId (ref: User),
  doctor: ObjectId (ref: User),
  appointmentDate: Date,
  appointmentTime: String,
  status: String (enum: ["Pending", "Confirmed", "Cancelled"]),
  message: String
}
```

### Message Schema
```javascript
{
  sender: ObjectId (ref: User),
  receiver: ObjectId (ref: User),
  message: String,
  timestamp: Date
}
```

## 🌐 API Endpoints

### Authentication Routes
- `POST /api/v1/user/patient/register` - Patient registration
- `POST /api/v1/user/login` - User login
- `POST /api/v1/user/admin/addnew` - Add new admin (admin only)

### Appointment Routes
- `POST /api/v1/appointment/new` - Create appointment
- `GET /api/v1/appointment/my` - Get user appointments
- `PUT /api/v1/appointment/:id` - Update appointment
- `DELETE /api/v1/appointment/:id` - Cancel appointment

### Message Routes
- `POST /api/v1/message/new` - Send message
- `GET /api/v1/message/my` - Get user messages

## 🔄 Data Flow

### Patient Journey
```
1. Registration → Account Creation
2. Login → JWT Token
3. Book Appointment → Doctor Selection
4. Send Messages → Communication
5. View Appointments → Status Tracking
```

### Doctor Journey
```
1. Login → Dashboard Access
2. View Appointments → Patient Management
3. Respond to Messages → Patient Communication
4. Update Profile → Information Management
```

### Admin Journey
```
1. Login → Full System Access
2. User Management → Add/Edit Users
3. System Monitoring → Analytics & Reports
4. Content Management → System Configuration
```

## 🚀 Deployment Architecture

### Development Environment
- **Frontend**: `http://localhost:5173`
- **Dashboard**: `http://localhost:5174`
- **Backend**: `http://localhost:4000`
- **Database**: MongoDB Atlas (Cloud)

### Production Environment
- **Frontend**: Netlify/Render
- **Dashboard**: Netlify/Render
- **Backend**: Render/Heroku
- **Database**: MongoDB Atlas
- **CDN**: Cloudinary (for images)

## 🔒 Security Features

### Authentication Security
- JWT token-based authentication
- HTTP-only cookies for token storage
- Password hashing with bcrypt
- Role-based access control

### Data Security
- Input validation and sanitization
- CORS configuration
- Rate limiting (recommended)
- Environment variable protection

### API Security
- Request validation middleware
- Error handling without sensitive data exposure
- Secure headers configuration

## 📈 Scalability Considerations

### Horizontal Scaling
- Stateless API design
- Database connection pooling
- CDN for static assets
- Load balancer ready

### Performance Optimization
- Database indexing on frequently queried fields
- Image optimization with Cloudinary
- Client-side caching strategies
- API response compression

## 🛠️ Development Workflow

### Local Development Setup
1. Clone repository
2. Install dependencies (`npm install`)
3. Configure environment variables
4. Start MongoDB connection
5. Run development servers

### Code Organization
- **Controllers**: Business logic separation
- **Models**: Data structure definitions
- **Routes**: API endpoint organization
- **Middlewares**: Reusable functionality
- **Utils**: Helper functions

## 📋 System Requirements

### Minimum Requirements
- **Node.js**: v16.0.0+
- **MongoDB**: v5.0+
- **npm**: v8.0.0+
- **RAM**: 4GB+
- **Storage**: 10GB+

### Recommended Requirements
- **Node.js**: v18.0.0+
- **MongoDB**: v6.0+
- **npm**: v9.0.0+
- **RAM**: 8GB+
- **Storage**: 20GB+

## 🔧 Configuration Management

### Environment Variables
```env
PORT=4000
NODE_ENV=development
MONGO_URI=mongodb+srv://...
JWT_SECRET_KEY=your-secret-key
JWT_EXPIRES=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### API Configuration
- Base URL configuration for different environments
- CORS settings for cross-origin requests
- Request/response interceptors
- Error handling middleware

## 📊 Monitoring & Logging

### Application Monitoring
- Server health check endpoints
- Database connection monitoring
- API response time tracking
- Error logging and reporting

### User Activity Tracking
- Login/logout events
- Appointment booking analytics
- Message communication metrics
- System usage statistics

## 🔄 Future Enhancements

### Planned Features
- Real-time notifications (WebSocket)
- Video consultation integration
- Payment gateway integration
- Advanced reporting dashboard
- Mobile application
- Multi-language support

### Technical Improvements
- GraphQL API implementation
- Microservices architecture
- Redis caching layer
- Automated testing suite
- CI/CD pipeline
- Docker containerization

---

*This document provides a comprehensive overview of the CURAFLOW Hospital Management System architecture. For detailed implementation guides and API documentation, refer to the respective component documentation.* 