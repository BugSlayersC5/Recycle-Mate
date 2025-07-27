// import axios from "axios";

// export const apiClient = axios.create(
//     {
//         baseURL: import.meta.env.VITE_API_BASE_URL
//     }
// );

// export const apiFetcher = async (url) => {
//     const response = await apiClient.get(url, {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//     });
//     return response.data;
// }



// src/api/client.js
import axios from "axios";

export const apiClient = axios.create(
    {
        baseURL: import.meta.env.VITE_API_BASE_URL
    }
);

// Add a request interceptor to apiClient directly
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // <--- CORRECTED KEY HERE
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// It's generally better to use the apiClient directly for all requests
// rather than wrapping it in apiFetcher if you want the interceptor to apply.
// Your CollectorDashboard already uses apiClient.get and apiClient.patch directly,
// so this interceptor will now correctly apply.
export const apiFetcher = async (url) => {
    // This apiFetcher is now redundant if you use apiClient directly everywhere.
    // If you do use it, it will now correctly get the token via the interceptor.
    const response = await apiClient.get(url); // Interceptor handles the header
    return response.data;
}

// Optional: Add a response interceptor for global 401 handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('role');
            window.location.href = '/login'; // Full page reload for clean state
        }
        return Promise.reject(error);
    }
);