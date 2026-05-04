import axiosClient from "./axiosClient";

export const getBookingsForShip = async (shipId: number) => {
	const res = await axiosClient.get(`ships/${shipId}/bookings/`);
	return res.data;
};