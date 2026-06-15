import { getBabyAgeMonths } from "../engine/ageEngine";
import { useBabyStore } from "../store/useBabyStore";

export function useBabyAge(): number {
  const baby = useBabyStore((state) => state.baby);
  return baby ? getBabyAgeMonths(baby.dateOfBirth) : 0;
}
