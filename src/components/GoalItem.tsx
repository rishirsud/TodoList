import { StyleSheet, View, Text, Pressable } from "react-native";

interface GoalItemProps {
  text: string;
  id: string;
  onDeleteItem: (id: string) => void;
  navigation?: any;
}

const GoalItem = ({ text, id, onDeleteItem, navigation }: GoalItemProps) => {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#210644" }}
        // onPress={onDeleteItem.bind(this, id)}
        onPress={() => navigation.navigate("Goal Details")}
        // style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "white",
    padding: 8,
  },
});
