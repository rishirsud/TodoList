import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import uuid from "react-native-uuid";
import GoalInput from "../components/GoalInput";
import GoalItem from "../components/GoalItem";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface GoalsScreenProps {
  navigation?: any;
}

interface GoalProps {
  title: string;
  description: string;
  id: string;
  deadline: string;
  completed: boolean;
}

const GoalsScreen = ({ navigation }: GoalsScreenProps) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([] as GoalProps[]);

  const startAddGoalHandler = () => {
    setModalIsVisible(true);
  };

  const endAddGoalHandler = () => {
    setModalIsVisible(false);
  };

  const getAllGoals = async () => {
    const response = await fetch("http://localhost:3000/tasks");
    const goals = await response.json();
    setCourseGoals(goals);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAllGoals();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getAllGoals();
  }, []);

  const addGoalHandler = (enteredGoalText: GoalProps) => {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      {
        title: enteredGoalText.title,
        id: uuid.v4().toString(),
        description: enteredGoalText.description,
        deadline: enteredGoalText.deadline,
        completed: enteredGoalText.completed,
      },
    ]);
    endAddGoalHandler();
  };

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.appContainer}>
        <View style={styles.goalsContainer}>
          <GestureHandlerRootView>
            <FlatList
              data={courseGoals}
              renderItem={(itemData: any) => {
                return (
                  <GoalItem
                    goalData={itemData.item}
                    navigation={navigation}
                    key={itemData.item.id}
                  />
                );
              }}
              keyExtractor={(item: any, index) => {
                return item.id;
              }}
              alwaysBounceVertical={false}
            />
          </GestureHandlerRootView>
        </View>
        <Button
          title="Add New Goal"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />
      </View>
    </>
  );
};

export default GoalsScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  goalsContainer: {
    flex: 0.95,
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
