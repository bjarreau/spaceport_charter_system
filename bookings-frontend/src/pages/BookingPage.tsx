import { useEffect, useState } from "react";
import { getAvailability } from "../api/bookings";
import ShipDropDown from "../components/ShipDropDown";
import ShipAvailability from "../components/ShipAvailability";

export default function BookingPage() {
	const [selectedShipId, setSelectedShipId] = useState<number | null>(null);
	const [selectedDate, setSelectedDate] = useState("");
	const [free, setFree] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	
	useEffect(() => {
		if (!selectedShipId || !selectedDate) return;
		setLoading(true);
		getAvailability(selectedShipId, selectedDate)
			.then(data => setFree(data.free))
			.finally(() => setLoading(false));
	}, [selectedShipId, selectedDate]);
	
	return (
	  <div>
	    <h2> Book Your Ship! </h2>
		<ShipDropDown onSelect={setSelectedShipId} />
		
		{selectedShipId && (
		  <div style={{ marginTop: "1rem" }}>
		    <label> Select a date: </label>
			<input 
			  type="date" 
			  value={selectedDate} 
			  onChange={e => setSelectedDate(e.target.value)}
			/>
		  </div>
		)}
		
		{selectedDate && !loading && (
		  <ShipAvailability free={free} />
		)}
		
		{loading && <p> Loading ... </p>}
	  </div>
	);
}
