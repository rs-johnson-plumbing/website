import { conceptTwo } from "@/lib/content";
import { C2Icon } from "./C2Icon";

export function C2Location() {
  return (
    <p className="c2-location">
      <C2Icon name="map-pin" size={20} />
      <span>{conceptTwo.home.hero.eyebrow}</span>
    </p>
  );
}
