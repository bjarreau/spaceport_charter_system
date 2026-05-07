import { useEffect, useState } from "react";
import { getDashboardData } from "../api/ships";

type Ship = {
  shipId: number;
  shipName: string;
  bookings: {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    pilot: string;
  }[];
};

export default function ShipList() {
	const [ships, setShips] = useState<Ship[]>([]);
	useEffect(() => {
		getDashboardData().then(setShips);
	}, []);
	
	return (
	  <div>
	    <h2>Ship Dashboard</h2>
		{ships.map(ship => (
          <div key={ship.shipId} style={{ marginBottom: "2rem" }}>
            <h3>{ship.shipName}</h3>

            <table className="dashboard-table">
              <thead>
				<tr>
				  <th>Date</th>
				  <th>Start</th>
				  <th>End</th>
				  <th>Pilot</th>
				</tr>
			  </thead>
              <tbody>
                {ship.bookings.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ padding: "0.5rem", color: "#777" }}>
                      No bookings
                    </td>
                  </tr>
                )}

                {ship.bookings.map(b => (
                  <tr key={b.id}>
                    <td>{b.date}</td>
                    <td>{b.startTime}</td>
                    <td>{b.endTime}</td>
                    <td>{b.pilot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))} 
	  </div>
	);
}