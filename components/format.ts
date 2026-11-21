/** Swiss number format used on screen: 14'363, negatives with a real minus sign. */
export function swiss(value: number): string {
  const rounded = Math.round(Math.abs(value));
  const grouped = String(rounded).replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  return value < 0 && rounded !== 0 ? `−${grouped}` : grouped;
}
