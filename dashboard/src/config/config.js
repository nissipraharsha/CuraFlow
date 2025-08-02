// Dynamic Configuration for Dashboard
const getConfig = () => {
  const isDevelopment = import.meta.env.MODE === "development";
  const currentPort = window.location.port;
  
  // Auto-detect frontend port based on current dashboard port
  const getFrontendPort = () => {
    if (isDevelopment) {
      // If dashboard is on 5174, frontend should be on 5173
      // If dashboard is on 5175, frontend should be on 5174
      // If dashboard is on 5176, frontend should be on 5175
      const dashboardPort = parseInt(currentPort);
      return dashboardPort - 1;
    }
    return null; // Production will use full URLs
  };

  const config = {
    // Development Configuration
    development: {
      frontendUrl: `http://localhost:${getFrontendPort()}`,
      backendUrl: "http://localhost:4000",
      dashboardUrl: `http://localhost:${currentPort}`,
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