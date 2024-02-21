import { View, Text, StyleSheet } from "react-native";
import GoalStatus from "../components/GoalStatus";

const GoalDetailsScreen = ({ route }: { route: any }) => {
  const { goalData } = route.params;
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{goalData.title}</Text>
        <Text style={styles.taskId}>ID: {goalData.id}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.deadline}>Deadline: {goalData.deadline}</Text>
          <GoalStatus status={goalData.completed ? "complete" : "incomplete"} />
        </View>
        <Text style={styles.description}>{goalData.description}</Text>
      </View>
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
