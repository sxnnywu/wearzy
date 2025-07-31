import React from "react";
import { View, ViewProps, StyleProp, ViewStyle } from "react-native";

type CardProps = ViewProps & {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Card({ children, style, ...props }: CardProps) {
  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 16,
          marginVertical: 8,
          elevation: 2,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function CardContent({ children, style, ...props }: CardProps) {
  return (
    <View
      {...props}
      style={[
        {
          padding: 16,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
