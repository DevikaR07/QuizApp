import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function OptionButton({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 14,
        marginVertical: 6,
        borderRadius: 10,
        backgroundColor: selected ? "#4CAF50" : "#F2F2F2",
      }}
    >
      <Text style={{ fontSize: 16 }}>{label}</Text>
    </TouchableOpacity>
  );
}