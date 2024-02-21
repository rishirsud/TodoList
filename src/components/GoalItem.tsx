import { StyleSheet, View, Text, Pressable } from "react-native";
import GoalStatus from "./GoalStatus";

interface GoalItemProps {
  title: string;
  id: string;
  onDeleteItem: (id: string) => void;
  navigation?: any;
  goalData: any;
}

const GoalItem = ({
  title,
  id,
  onDeleteItem,
  navigation,
  goalData,
}: GoalItemProps) => {
  return (
    <Pressable
      android_ripple={{ color: "#210644" }}
      // onPress={onDeleteItem.bind(this, id)}
      onPress={() => navigation.navigate("Details", { goalData })}
      // style={({ pressed }) => pressed && styles.pressedItem}
    >
      <View style={styles.goal}>
        <View style={styles.heading}>
          <Text style={styles.title}>{goalData.title}</Text>
          <GoalStatus status={goalData.completed ? "complete" : "incomplete"} />
        </View>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {goalData.description}
        </Text>
      </View>
    </Pressable>
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
});
