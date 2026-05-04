import { useEffect, useState } from "react";
import { getShips } from "../api/ships";

type Ship = {
	id: number;
	name: string;
}

export default function ShipList() {
	const [ships, setShips] = useState<Ship[]>([]);
	useEffect(() => {
		getShips().then(setShips);
	}, []);
	
	return (
	  <div>
	    <h2> Available Ships </h2>
		<ul>
		{ships.map(ship => (
		  <li key={ship.id}>{ship.name}</li>
		))}
		</ul> 
	  </div>
	);
}