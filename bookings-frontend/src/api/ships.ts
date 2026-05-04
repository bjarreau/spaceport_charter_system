import axiosClient from "./axiosClient";

export const getShips = async () => {
	const res = await axiosClient.get("ships/");
	return res.data;
};