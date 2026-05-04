//generate 30 minute time slots in our hours of operation
export function generateTimeSlots() {
	const slots: string[] = [];
	let hour = 6;
	let min = 0;
	
	//do more things
	
	return slots;
}

//
export function getFreeSlots(bookings: any[], date: string) {
	const allSlots = generateTimeSlots();
	const blocked = new Set<string>();
	
	//filter out the bookings
	
	return allSlots.filter(slot => !blocked.has(slot));
}

