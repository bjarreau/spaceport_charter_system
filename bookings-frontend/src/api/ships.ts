import axiosClient from "./axiosClient";

export const getShips = async () => {
	const res = await axiosClient.get("ships/");
	return res.data;
};

export const getDashboardData = async () => {
  const res = await axiosClient.get("ships/dashboard/");
  return res.data.ships;
};