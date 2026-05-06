import axiosClient from "./axiosClient";

export const getBookingsForShip = async (shipId: number) => {
	const res = await axiosClient.get(`ships/${shipId}/bookings/`);
	return res.data;
};

export const getAvailability = async (shipId: number, date: string) => {
	const res = await axiosClient.get(`ships/${shipId}/availability/?date=${date}`);
	return res.data;
};

export const createBooking = async (payload: {
  shipId: number;
  startTime: string;
  durationMinutes: number;
  pilotName: string;
}) => {
  const res = await axiosClient.post("ships/book/", payload);
  return res.data;
};