import { useEffect, useState } from "react";
import { getBookingsForShip } from "../api/bookings";

type Booking = {
	id: number;
	startTime: string;
	endTime: string;
};

type Props = {
	shipId: number;
};

export default function ShipAvailability({ shipId }: Props) {
	const [bookings, setBookings] = useState<Booking[]>([]);
	
	useEffect(() => {
		if (shipId) {
			getBookingsForShip(shipId).then(setBookings);
		}
	}, [shipId]);
	
	if (!shipId) return null;
	
	return (
	  <div>
	    <h2> Availability for Ship #{shipId} </h2>
		<pre> {JSON.stringify(bookings, null, 2)} </pre>
	  </div>
	);
}
