import React from "react";
import { View, Text, ScrollView } from "react-native";

export default function Summary({ route }) {
  const { data, results } = route.params;

  const checkCorrect = (q, userAns) => {
    if (Array.isArray(q.correct)) {
      return (
        userAns?.sort().toString() === q.correct.sort().toString()
      );
    }
    return userAns?.[0] === q.correct;
  };

  // ✅ FIX: calculate score BEFORE return
  const score = data.reduce((total, q, i) => {
    return checkCorrect(q, results[i]) ? total + 1 : total;
  }, 0);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text testID="total" style={{ fontSize: 24, marginBottom: 20 }}>
        Score: {score}/{data.length}
      </Text>

      {data.map((q, i) => {
        const correct = checkCorrect(q, results[i]);

        return (
          <View key={i} style={{ marginBottom: 20 }}>
            <Text style={{ fontWeight: "bold" }}>{q.prompt}</Text>

            {q.choices.map((choice, idx) => {
              const isCorrect = Array.isArray(q.correct)
                ? q.correct.includes(idx)
                : q.correct === idx;

              const isSelected = results[i]?.includes(idx);

              return (
                <Text
                  key={idx}
                  style={{
                    fontWeight: isCorrect ? "bold" : "normal",
                    textDecorationLine:
                      isSelected && !isCorrect
                        ? "line-through"
                        : "none",
                  }}
                >
                  {choice}
                </Text>
              );
            })}

            <Text>
              Result: {correct ? "Correct" : "Incorrect"}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}