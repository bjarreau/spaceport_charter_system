type Props = {
  free: string[];
  onSelect: (slot: string) => void;
  selected: string | null;
};

export default function ShipAvailability({ free, onSelect, selected }: Props) {
	return (
	  <div>
	    <h2> Available Times </h2>
		{free.length === 0 && <p>No available times on this date. </p>}
		
		<div style={{ display: "flex", flexWrap: "wrap" }}>
		  {free.map(slot => (
		    <button key={slot} 
			  onClick={() => onSelect(slot)}
			  style={{
			    padding: "0.5rem 1rem",
				borderRadius: "6px",
				border: "1px solid #ccc",
				backgroundColor: selected === slot ? "gray" : "white",
				color: selected === slot ? "white" : "black",
				cursor: "pointer"
			  }}
			>
			  {slot}
			</button>
		  ))} 
		</div>
	  </div>
	);
}
