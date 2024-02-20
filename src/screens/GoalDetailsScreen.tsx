import { View, Text } from "react-native";

const GoalDetailsScreen = ({ route }: { route: any }) => {
  const { goalData } = route.params;
  return (
    <View>
      <Text>{goalData.title}</Text>
      <Text>{goalData.completed as string} booleans</Text>
      <Text>{goalData.deadline}</Text>
      <Text>{goalData.description}</Text>
      <Text>{goalData.id}</Text>
    </View>
  );
};

export default GoalDetailsScreen;
