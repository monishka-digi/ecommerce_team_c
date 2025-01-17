import axios from "axios";

const axiosInstance = axios.create({baseURL: "https://dummyjson.com"});

axiosInstance.interceptors.request.use(
	(config) => config,
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response && error.response.status === 401) {
			return Promise.reject(error);
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
