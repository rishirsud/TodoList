import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
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
    {
      title: "Goal 2",
      id: uuid.v4().toString(),
      description: "Description 1",
      deadline: "2022-12-31",
      completed: false,
    },
    {
      title: "Goal 3",
      id: uuid.v4().toString(),
      description: "Description 1",
      deadline: "2022-12-31",
      completed: false,
    },
    {
      title: "Goal 4",
      id: uuid.v4().toString(),
      description: "Description 1",
      deadline: "2022-12-31",
      completed: false,
    },
    {
      title: "Goal 5",
      id: uuid.v4().toString(),
      description: "Description 1",
      deadline: "2022-12-31",
      completed: false,
    },
    {
      title: "Goal 6",
      id: uuid.v4().toString(),
      description: "Description 1",
      deadline: "2022-12-31",
      completed: false,
    },
    {
      title: "Goal 7",
      id: uuid.v4().toString(),
      description: "Description 1",
      deadline: "2022-12-31",
      completed: false,
    },
    {
      title: "Goal 8",
      id: uuid.v4().toString(),
      description: "Description 1",
      deadline: "2022-12-31",
      completed: false,
    },
    {
      title: "Goal 9",
      id: uuid.v4().toString(),
      description: "Description 1",
      deadline: "2022-12-31",
      completed: false,
    },
    {
      title: "Goal 10",
      id: uuid.v4().toString(),
      description: "Description 1",
      deadline: "2022-12-31",
      completed: false,
    },
    {
      title: "Goal 11",
      id: uuid.v4().toString(),
      description: "Description 1",
      deadline: "2022-12-31",
      completed: false,
    },
    {
      title: "Goal 12",
      id: uuid.v4().toString(),
      description: "Description 1",
      deadline: "2022-12-31",
      completed: false,
    },
    {
      title: "Goal 13",
      id: uuid.v4().toString(),
      description: "Description 1",
      deadline: "2022-12-31",
      completed: false,
    },
    {
      title: "Goal 14",
      id: uuid.v4().toString(),
      description: "Description 1",
      deadline: "2022-12-31",
      completed: false,
    },
    {
      title: "Goal 15",
      id: uuid.v4().toString(),
      description: "Description 1",
      deadline: "2022-12-31",
      completed: false,
    },
  ]);
  const [tasks, setAllTasks] = useState([] as any);
  const [loading, setLoading] = useState(false);

  const startAddGoalHandler = () => {
    setModalIsVisible(true);
  };

  const endAddGoalHandler = () => {
    setModalIsVisible(false);
  };

  async function getAllTasks() {
    setLoading(true);
    const response = await fetch("http://localhost:3000/tasks");
    const tasks = await response.json();
    setAllTasks(tasks);
    console.log("tasks", tasks);
    setLoading(false);
  }

  useEffect(() => {
    getAllTasks();
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

  const deleteGoalHandler = (id: string) => {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal: any) => goal.id !== id);
    });
  };

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.appContainer}>
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
      </View>
    </>
  );
};

export default GoalsScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    // paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  goalsContainer: {
    flex: 0.95,
  },
});
