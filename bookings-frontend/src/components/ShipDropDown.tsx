import { useEffect, useState } from "react";
import { getShips } from "../api/ships";

type Ship = {
	id: number;
	name: string;
};

type Props = {
	onSelect: (shipId: number) => void;
};

export default function ShipDropDown({ onSelect }: Props) {
	const [ships, setShips] = useState<Ship[]>([]);
	
	useEffect(() => {
		getShips().then(setShips);
	}, []);
	
	return (
	  <select onChange={e => onSelect(Number(e.target.value))}>
	   <option value="">Select a Ship</option>
		{ships.map(ship => (
		  <option key={ship.id} value={ship.id}>
		    {ship.name}
		  </option>
		))}
	  </select>
	);
}