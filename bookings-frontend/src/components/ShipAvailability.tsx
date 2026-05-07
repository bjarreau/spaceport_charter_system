type Props = {
  free: string[];
  onSelect: (slot: string) => void;
  selected: string | null;
};

export default function ShipAvailability({ free, onSelect, selected }: Props) {
	return (
	  <div className="booking-section">
	    <h3> Available Times </h3>
		{free.length === 0 && <p>No available times on this date. </p>}
		
		<div className="timeslot-grid">
		  {free.map(slot => (
		    <button key={slot} 
			  className={
                "timeslot-btn" + (selected === slot ? " selected" : "")
              }
			  onClick={() => onSelect(slot)}
			>
			  {slot}
			</button>
		  ))} 
		</div>
	  </div>
	);
}
