import { StyleSheet, View, Text, Pressable, Button } from "react-native";
import GoalStatus from "./GoalStatus";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useState } from "react";

interface GoalItemProps {
  navigation?: any;
  goalData: any;
}

const GoalItem = ({ navigation, goalData }: GoalItemProps) => {
  const [status, setStatus] = useState(goalData.completed);

  const completeGoal = async () => {
    await fetch("http://localhost:3000/tasks/" + goalData.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    });
    setStatus(true);
  };

  const LeftActions = () => {
    return (
      <View style={styles.leftAction}>
        <Button
          title="Done"
          color="white"
          onPress={() => {
            completeGoal();
          }}
        />
      </View>
    );
  };

  return (
    <Swipeable
      renderLeftActions={LeftActions}
    >
      <Pressable
        onPress={() => navigation.navigate("Details", { goalData })}
      >
        <View style={styles.goal}>
          <View style={styles.heading}>
            <Text style={styles.title}>{goalData.title}</Text>
            <GoalStatus status={status ? "complete" : "incomplete"} />
          </View>
          <Text
            style={styles.description}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {goalData.description}
          </Text>
        </View>
      </Pressable>
    </Swipeable>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  goal: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderColor: "lightgrey",
    minHeight: 90,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
  },
  description: {
    color: "grey",
    paddingTop: 5,
    fontSize: 16,
  },
  leftAction: {
    backgroundColor: "green",
    justifyContent: "center",
  },
  rightAction: {
    backgroundColor: "blue",
    justifyContent: "center",
  },
});
