import { Bath, Scissors, Sparkles, Truck, Car } from "lucide-react";
import type { Service } from "../lib/business";

export default function ServiceIcon({
  icon,
  className = "h-7 w-7",
}: {
  icon: Service["icon"];
  className?: string;
}) {
  switch (icon) {
    case "bath":
      return <Bath className={className} />;
    case "scissors":
      return <Scissors className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    case "truck":
      return <Truck className={className} />;
    case "car":
      return <Car className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}
