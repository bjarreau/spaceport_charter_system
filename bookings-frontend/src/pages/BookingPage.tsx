import { useState } from "react";
import ShipDropDown from "../components/ShipDropDown";
import ShipAvailability from "../components/ShipAvailability";

export default function BookingPage() {
	const [selectedShipId, setSelectedShipId] = useState<number | null>(null);
	
	return (
	  <div>
	    <h2> Book Your Ship! </h2>
		<ShipDropDown onSelect={setSelectedShipId} />
		{selectedShipId && (
		  <ShipAvailability shipId={selectedShipId} />
		)}
	  </div>
	);
}
