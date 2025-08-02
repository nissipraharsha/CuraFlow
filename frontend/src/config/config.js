// Dynamic Configuration for Frontend
const getConfig = () => {
  const isDevelopment = import.meta.env.MODE === "development";
  const currentPort = window.location.port;
  
  // Auto-detect dashboard port based on current frontend port
  const getDashboardPort = () => {
    if (isDevelopment) {
      // If frontend is on 5173, dashboard should be on 5174
      // If frontend is on 5174, dashboard should be on 5175
      // If frontend is on 5175, dashboard should be on 5176
      const frontendPort = parseInt(currentPort);
      return frontendPort + 1;
    }
    return null; // Production will use full URLs
  };

  const config = {
    // Development Configuration
    development: {
      frontendUrl: `http://localhost:${currentPort}`,
      backendUrl: "http://localhost:4000",
      dashboardUrl: `http://localhost:${getDashboardPort()}`,
    },
    
    // Production Configuration (for Render)
    production: {
      frontendUrl: "https://curaflow-hospital-management-frontend.onrender.com",
      backendUrl: "https://curaflow-hospital-management-backend.onrender.com", 
      dashboardUrl: "https://curaflow-hospital-management-dashboard.onrender.com",
    }
  };

  return isDevelopment ? config.development : config.production;
};

export default getConfig; 