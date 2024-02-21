import { View, Text, StyleSheet, Button } from "react-native";
import GoalStatus from "../components/GoalStatus";
import { useState } from "react";

const GoalDetailsScreen = ({ route }: { route: any }) => {
  const { goalData } = route.params;

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

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{goalData.title}</Text>
        <Text style={styles.taskId}>ID: {goalData.id}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.deadline}>Deadline: {goalData.deadline}</Text>
          <GoalStatus status={status ? "complete" : "incomplete"} />
        </View>
        <Text style={styles.description}>{goalData.description}</Text>
      </View>
      <Button title="Mark Complete" onPress={completeGoal} />
    </>
  );
};

export default GoalDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    padding: 20,
  },
  title: {
    fontWeight: "600",
    fontSize: 24,
    paddingVertical: 10,
  },
  taskId: {
    fontSize: 16,
  },
  description: { fontSize: 16 },
  status: {},
  deadline: {
    fontSize: 16,
  },
  additionalDetails: {},

  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    marginBottom: 10,
  },
});
