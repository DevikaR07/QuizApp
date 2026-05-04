import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Question from "./screens/Questions";
import Summary from "./screens/Summary";

const Stack = createNativeStackNavigator();

const questions = [
  {
    prompt: "What is 2 + 2?",
    type: "multiple-choice",
    choices: ["4", "5", "6", "7"],
    correct: 0,
  },
  {
    prompt: "Select even numbers",
    type: "multiple-answer",
    choices: ["2", "3", "4", "5"],
    correct: [0, 2],
  },
  {
    prompt: "The sky is blue",
    type: "true-false",
    choices: ["False", "True"],
    correct: 1,
  },
];

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {/* Pass data ONLY once via initial params */}
        <Stack.Screen
          name="Question"
          component={Question}
          initialParams={{
            data: questions,
            index: 0,
            results: [],
          }}
        />

        <Stack.Screen name="Summary" component={Summary} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}