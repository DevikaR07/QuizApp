import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import OptionButton from "../components/OptionButton";
import ProgressBar from "../components/ProgressBar";

export default function Question({ route, navigation }) {
  const { data, index, results } = route.params;

  const question = data[index];
  const [selected, setSelected] = useState([]);

  const isMulti = question.type === "multiple-answer";

  const handleSelect = (i) => {
    if (!isMulti) setSelected([i]);
    else {
      setSelected((prev) =>
        prev.includes(i)
          ? prev.filter((x) => x !== i)
          : [...prev, i]
      );
    }
  };

  const handleNext = () => {
    const updated = [...results, selected];

    if (index + 1 < data.length) {
      navigation.push("Question", {
        data,
        index: index + 1,
        results: updated,
      });
    } else {
      navigation.replace("Summary", {
        data,
        results: updated,
      });
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      
      <ProgressBar current={index} total={data.length} />

      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        Question {index + 1} of {data.length}
      </Text>

      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        {question.prompt}
      </Text>

      {question.choices.map((choice, i) => (
        <OptionButton
          key={i}
          label={choice}
          selected={selected.includes(i)}
          onPress={() => handleSelect(i)}
        />
      ))}

      <Pressable
        onPress={handleNext}
        style={{
          marginTop: 20,
          backgroundColor: "#4CAF50",
          padding: 14,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Next Question
        </Text>
      </Pressable>
    </View>
  );
}