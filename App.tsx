import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import GoalDetailsScreen from "./src/screens/GoalDetailsScreen";
import GoalsScreen from "./src/screens/GoalsScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="GoalsScreen"
            component={GoalsScreen}
            options={{ title: "Goal List" }}
          />
          <Stack.Screen name="Details" component={GoalDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
