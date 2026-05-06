import { useEffect, useState } from "react";
import { getAvailability, createBooking } from "../api/bookings";
import ShipDropDown from "../components/ShipDropDown";
import ShipAvailability from "../components/ShipAvailability";

export default function BookingPage() {
	const [selectedShipId, setSelectedShipId] = useState<number | null>(null);
	const [selectedDate, setSelectedDate] = useState("");
	const [free, setFree] = useState<string[]>([]);
	const [selected, setSelected] = useState<string | null>(null);
	const [duration, setDuration] = useState(30);
    const [pilotName, setPilotName] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	
	useEffect(() => {
		setSelected(null);
	}, [selectedShipId, selectedDate]);
	
	useEffect(() => {
		if (!selectedShipId || !selectedDate) return;
		setLoading(true);
		getAvailability(selectedShipId, selectedDate)
			.then(data => setFree(data.free))
			.finally(() => setLoading(false));
	}, [selectedShipId, selectedDate]);
	
	const handleBook = async () => {
		if (!selectedShipId || !selectedDate || !selected) return;
		const startTime = `${selectedDate}T${selected}:00`;

		const res = await createBooking({
		  shipId: selectedShipId,
		  startTime,
		  durationMinutes: duration,
		  pilotName
		});

		if (res.success) {
		  setSuccess(true);
		}
	  };
	
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
		  <ShipAvailability free={free} selected={selected} onSelect={setSelected}/>
		)}
		
		{loading && <p> Loading ... </p>}
		
		{selected && (
		  <div style={{marginTop: "1rem"}}>
		    <h3> Booking Details: </h3>
		    <strong>Selected Time:</strong> {selected}
			<strong> Duration: </strong>
			<select value={duration} onChange={e => setDuration(Number(e.target.value))}>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
              <option value={150}>2.5 hours</option>
            </select>
			<div style={{ marginTop: "1rem" }}>
              <label>Pilot Name: </label>
              <input
                type="text"
                value={pilotName}
                onChange={e => setPilotName(e.target.value)}
              />
			</div>
			<button
              style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
              onClick={handleBook} > Book Now </button>
	      </div>
		)}
		{success && (
          <p style={{ color: "green", marginTop: "1rem" }}>
            Booking created successfully!
          </p>
      )}
	  </div>
	);
}
