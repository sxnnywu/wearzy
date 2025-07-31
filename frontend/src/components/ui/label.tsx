import { Text, TextProps } from "react-native";

export function Label(props: TextProps) {
  return (
    <Text {...props} style={[{ fontWeight: "bold", marginBottom: 4 }, props.style]}>
      {props.children}
    </Text>
  );
}
