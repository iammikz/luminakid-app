import { Redirect } from "expo-router";

import { useBabyStore } from "../src/store/useBabyStore";

export default function IndexScreen() {
  const baby = useBabyStore((state) => state.baby);
  return <Redirect href={baby ? "/(tabs)" : "/setup"} />;
}
