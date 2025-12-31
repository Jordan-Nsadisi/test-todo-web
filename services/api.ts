import axios from "axios";

const API = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api",
	timeout: 30000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor for auth token
API.interceptors.request.use((config: any) => {
	const token = localStorage.getItem("auth-token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

//response interceptor for error handling
API.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem("auth-token");
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

export default API;
