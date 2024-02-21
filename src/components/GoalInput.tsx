import { useState } from "react";
import { Button, Modal, StyleSheet, TextInput, View } from "react-native";
import uuid from "react-native-uuid";

interface GoalProps {
  title: string;
  description: string;
  id: string;
  deadline: string;
  completed: boolean;
}

interface GoalInputProps {
  visible: boolean;
  onAddGoal: (goalText: GoalProps) => void;
  onCancel: () => void;
}

const GoalInput = ({ visible, onAddGoal, onCancel }: GoalInputProps) => {
  const [goalTitle, setGoalTitle] = useState<string>("");
  const [goalDescription, setGoalDescription] = useState<string>("");
  const [goalDeadline, setGoalDeadline] = useState<string>("");

  const addGoalHandler = () => {
    onAddGoal({
      title: goalTitle,
      description: goalDescription,
      id: uuid.v4().toString(),
      deadline: goalDeadline,
      completed: false,
    });
    postGoal({
      title: goalTitle,
      description: goalDescription,
      id: uuid.v4().toString(),
      deadline: goalDeadline,
      completed: false,
    });
    setGoalTitle("");
    setGoalDescription("");
    setGoalDeadline("");
  };

  const postGoal = async (goal: GoalProps) => {
    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goal),
    });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Goal Title"
          onChangeText={setGoalTitle}
          value={goalTitle}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Deadline"
          onChangeText={setGoalDeadline}
          value={goalDeadline}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Description"
          onChangeText={setGoalDescription}
          value={goalDescription}
          multiline
          numberOfLines={4}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={onCancel} color="#f31282" />
          </View>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} color="#b180f0" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#311b6b",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#120438",
    borderRadius: 6,
    width: "100%",
    padding: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
});
