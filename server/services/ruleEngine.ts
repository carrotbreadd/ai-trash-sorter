export type DisposalType =
  | "Recycle"
  | "Compost"
  | "Landfill"
  | "Unknown";

export function classifyItem(item: string): DisposalType {
  const name = item.toLowerCase();

  if (
    name.includes("banana") ||
    name.includes("apple") ||
    name.includes("food")
  ) {
    return "Compost";
  }

  if (
    name.includes("plastic bottle") ||
    name.includes("aluminum can") ||
    name.includes("glass bottle")
  ) {
    return "Recycle";
  }

  if (
    name.includes("styrofoam") ||
    name.includes("diaper")
  ) {
    return "Landfill";
  }

  return "Unknown";
}
