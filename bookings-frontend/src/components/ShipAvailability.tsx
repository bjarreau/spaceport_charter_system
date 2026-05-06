type Props = {
  free: string[];
};

export default function ShipAvailability({ free }: Props) {
	return (
	  <div>
	    <h2> Availability Times </h2>
		{free.length === 0 && <p>No available times on this date. </p>}
		<ul> 
		  {free.map(slot => (
		    <li key={slot}>{slot}</li>
		  ))} 
		</ul>
	  </div>
	);
}
