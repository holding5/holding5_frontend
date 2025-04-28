import { useWindowDimensions } from "react-native";

export function maxWidth() {
  const { width } = useWindowDimensions();
  return width * 0.95;
}   