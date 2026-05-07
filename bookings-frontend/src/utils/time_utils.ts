
export function computeDurations(start: string, freeSlots: string[]) {
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
    if (slotMin === closingMin) {
	  durations.push(slotMin - startMin);
	  break;
	}
	if (slotMin >= closingMin) break;
    if (slotMin - lastMin !== 30) break;

    durations.push(slotMin - startMin);
    lastMin = slotMin;
  }

  return durations;
}
