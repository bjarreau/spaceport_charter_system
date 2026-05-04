import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookingsForShip } from "../api/bookings";

type Booking = {
	id: number;
	startTime: string;
	endTime: string;
};

export default function BookingPage() {
	const { shipId } = useParams();
	const [bookings, setBookings] = useState<Booking[]>([]);
	
	useEffect(() => {
		if (shipId) {
			getBookingsForShip(Number(shipId)).then(setBookings);
		}
	}, [shipId]);
	
	return (
	  <div>
	    <h2> Ship Availability </h2>
		<pre> {JSON.stringify(bookings, null, 2)} </pre>
	  </div>
	);
}
