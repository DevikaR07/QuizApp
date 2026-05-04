import React from "react";
import { View, Text, ScrollView } from "react-native";

export default function Summary({ route }) {
  const { data, results } = route.params;

  const check = (q, ans) => {
    if (Array.isArray(q.correct)) {
      return ans?.sort().toString() === q.correct.sort().toString();
    }
    return ans?.[0] === q.correct;
  };

  const score = data.reduce((acc, q, i) => {
    return check(q, results[i]) ? acc + 1 : acc;
  }, 0);

  return (
    <ScrollView style={{ padding: 20 }}>
      
      <Text style={{ fontSize: 26, marginBottom: 20 }}>
        Score: {score} / {data.length}
      </Text>

      {data.map((q, i) => {
        const correct = check(q, results[i]);

        return (
          <View key={i} style={{ marginBottom: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {q.prompt}
            </Text>

            {q.choices.map((c, idx) => {
              const isCorrect = Array.isArray(q.correct)
                ? q.correct.includes(idx)
                : q.correct === idx;

              const isSelected = results[i]?.includes(idx);

              return (
                <Text
                  key={idx}
                  style={{
                    fontWeight: isCorrect ? "bold" : "normal",
                    color: isCorrect ? "#2e7d32" : "#000",
                    textDecorationLine:
                      isSelected && !isCorrect ? "line-through" : "none",
                  }}
                >
                  {c}
                </Text>
              );
            })}

            <Text
              style={{
                marginTop: 5,
                color: correct ? "green" : "red",
              }}
            >
              {correct ? "Correct" : "Incorrect"}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}