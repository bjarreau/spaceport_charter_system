import { useEffect, useState } from "react";
import { getAvailability, createBooking } from "../api/bookings";
import ShipDropDown from "../components/ShipDropDown";
import ShipAvailability from "../components/ShipAvailability";

function formatDuration(min: number) {
  const hours = Math.floor(min / 60);
  const minutes = min % 60;

  if (hours === 0) {
    return `${minutes} minutes`;
  }

  if (minutes === 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  }

  return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minutes`;
}

function computeDurations(start: string, freeSlots: string[]) {
  const toMin = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const startMin = toMin(start);
  const closingMin = 22 * 60; // 22:00

  // Sort free slots just in case
  const sorted = [...freeSlots].sort();

  // Find all free slots AFTER the start time
  const afterStart = sorted.filter(t => toMin(t) > startMin);

  const durations: number[] = [];
  let lastMin = startMin;

  for (const slot of afterStart) {
    const slotMin = toMin(slot);

    // Stop if we hit closing time or another booking
    if (slotMin > closingMin) break;
    if (slotMin - lastMin !== 30) break;

    durations.push(slotMin - startMin);
    lastMin = slotMin;
  }

  return durations;
}

export default function BookingPage() {
	const [selectedShipId, setSelectedShipId] = useState<number | null>(null);
	const [selectedDate, setSelectedDate] = useState("");
	const [free, setFree] = useState<string[]>([]);
	const [selected, setSelected] = useState<string | null>(null);
	const [durationOptions, setDurationOptions] = useState<number[]>([]);
	const [duration, setDuration] = useState<number | null>(null);
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
	
	useEffect(() => {
	  if (selected) {
		const options = computeDurations(selected, free);
		setDurationOptions(options);
		setDuration(null);
	  }
	}, [selected, free]);
	
	const handleBook = async () => {
		if (!selectedShipId || !selectedDate || !selected) return;
		const startTime = `${selectedDate}T${selected}:00`;
		
		if (!duration) {
		    alert("Please select a duration");
		    return;
		}

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
	  <div className="booking-container">
	    <h2> Book Your Ship! </h2>
		  <div className="booking-section">
		    <ShipDropDown onSelect={setSelectedShipId} />
		  </div>
		
		{selectedShipId && (
		  <div className="booking-section">
		    <h3> Select a date: </h3>
			<input 
			  type="date" 
			  className="booking-input"
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
		  <div className="booking-section">
		    <strong>Selected Time:</strong> {selected}
			<h3> Duration: </h3>
			<select 
			  className="booking-select"
			  value={duration ?? ""} 
			  onChange={e => setDuration(Number(e.target.value))}
			>
              <option value={""} disabled>Select Duration</option>
			  {durationOptions.map(min => (
				<option key={min} value={min}>
				  {formatDuration(min)}
				</option>
			  ))}
            </select>
			<div className="booking-section">
              <h3>Pilot Name: </h3>
              <input
                type="text"
                value={pilotName}
                onChange={e => setPilotName(e.target.value)}
              />
			</div>
			<button
              className="book-btn"
              onClick={handleBook} > Book Now </button>
	      </div>
		)}
		{success && (
          <p className="success-message">
            Booking created successfully!
          </p>
      )}
	  </div>
	);
}
