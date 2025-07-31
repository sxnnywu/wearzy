import { TextInput, TextInputProps } from "react-native";

export function Input(props: TextInputProps) {
  return (
    <TextInput
      {...props}
      style={[
        {
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 6,
          marginBottom: 8,
        },
        props.style,
      ]}
    />
  );
}
