import axios from "axios";

//add our axios client so we avoid repeating base URL
//keep all API in one location
//and have a nice place to intercept errors
const axiosClient = axios.create({
	baseURL: "http://localhost:8000/api",
	headers: {
		"Content-Type": "application/json",
	},
});

export default axiosClient;