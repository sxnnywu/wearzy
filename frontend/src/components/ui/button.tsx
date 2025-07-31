import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <TouchableOpacity {...props} style={[{ padding: 10, backgroundColor: "#000", borderRadius: 6 }, props.style]}>
      <Text style={{ color: "#fff", textAlign: "center" }}>{children}</Text>
    </TouchableOpacity>
  );
}
