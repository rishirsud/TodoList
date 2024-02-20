import { Text, StyleSheet } from "react-native";

interface GoalStatusProps {
  status: string;
}

const GoalStatus = ({ status }: GoalStatusProps) => {
  switch (status) {
    case "complete":
      return <Text style={styles.complete}>Complete</Text>;
    case "incomplete":
      return <Text style={styles.incomplete}>Incomplete</Text>;
    default:
      return <Text>Unknown</Text>;
  }
};

export default GoalStatus;

const styles = StyleSheet.create({
  complete: {
    color: "green",
  },
  incomplete: {
    color: "red",
  },
});
