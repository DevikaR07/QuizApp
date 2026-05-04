import React, { useState } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

export default function Question({ route, navigation }) {
  const { data, index, results } = route.params || {};

  const question = data[index];

  const [selected, setSelected] = useState([]);

  const isMulti = question.type === "multiple-answer";

  const handleSelect = (i) => {
    if (!isMulti) {
      setSelected([i]);
    } else {
      if (selected.includes(i)) {
        setSelected(selected.filter((x) => x !== i));
      } else {
        setSelected([...selected, i]);
      }
    }
  };

  const handleNext = () => {
    const updatedResults = [...results, selected];

    if (index + 1 < data.length) {
      navigation.push("Question", {
        data,
        index: index + 1,
        results: updatedResults,
      });
    } else {
      navigation.replace("Summary", {
        data,
        results: updatedResults,
      });
    }
  };


    return (
  <View style={{ padding: 20 }}>
    
    <Text style={{ fontSize: 20, marginBottom: 20 }}>
      {question.prompt}
    </Text>

    {/* 👇 STEP 3 GOES HERE */}
    {question.choices.map((choice, i) => (
      <TouchableOpacity
        key={i}
        onPress={() => handleSelect(i)}
        style={{
          padding: 12,
          marginVertical: 6,
          backgroundColor: selected.includes(i)
            ? "#d0e8ff"
            : "#eee",
          borderRadius: 8,
        }}
      >
        <Text>{choice}</Text>
      </TouchableOpacity>
    ))}

    <Pressable
      testID="next-question"
      onPress={handleNext}
      style={{
        marginTop: 20,
        backgroundColor: "#4CAF50",
        padding: 12,
      }}
    >
      <Text style={{ color: "white", textAlign: "center" }}>
        Next Question
      </Text>
    </Pressable>

  </View>
   );

}