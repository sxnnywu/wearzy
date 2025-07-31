import React, { ReactNode } from "react";
import { View, Text, ViewProps } from "react-native";

export function Alert({ children, ...props }: ViewProps & { children: React.ReactNode }) {
  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: "#fdecea",
          borderLeftWidth: 4,
          borderLeftColor: "#f44336",
          padding: 10,
          marginVertical: 8,
          borderRadius: 6,
        },
        props.style,
      ]}
    >
      <Text style={{ color: "#b71c1c" }}>{children}</Text>
    </View>
  );
}
