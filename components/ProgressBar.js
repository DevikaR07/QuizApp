import React from "react";
import { View } from "react-native";

export default function ProgressBar({ current, total }) {
  const percent = ((current + 1) / total) * 100;

  return (
    <View
      style={{
        height: 6,
        backgroundColor: "#eee",
        borderRadius: 5,
        marginBottom: 15,
      }}
    >
      <View
        style={{
          width: `${percent}%`,
          height: 6,
          backgroundColor: "#4CAF50",
          borderRadius: 5,
        }}
      />
    </View>
  );
}