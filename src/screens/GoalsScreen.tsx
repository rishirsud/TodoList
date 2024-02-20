import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import uuid from "react-native-uuid";
import GoalInput from "../components/GoalInput";
import GoalItem from "../components/GoalItem";

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
  const [courseGoals, setCourseGoals] = useState([
    {
      title: "Goal 1",
      id: uuid.v4().toString(),
      description: "Description 1",
      deadline: "2022-12-31",
      completed: false,
    },
  ]);

  const startAddGoalHandler = () => {
    setModalIsVisible(true);
  };

  const endAddGoalHandler = () => {
    setModalIsVisible(false);
  };

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

  const deleteGoalHandler = (id: string) => {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal: any) => goal.id !== id);
    });
  };

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#a065ec"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData: any) => {
              return (
                <GoalItem
                  goalData={itemData.item}
                  navigation={navigation}
                  key={itemData.item.id}
                  title={itemData.item.title}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item: any, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
};

export default GoalsScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
