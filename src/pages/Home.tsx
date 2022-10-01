import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask : Task = {
      done : false,
      id : new Date().getTime(),
      title : newTaskTitle
    }

    setTasks(oldTasks => [...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    let taskIndexToToogleDone = tasks.findIndex(task => task.id === id);
    let taskToToogle = tasks.find(task => task.id === id);
    if(taskToToogle){
      taskToToogle.done = !taskToToogle.done;
      let updatedTasks = [...tasks];
      updatedTasks[taskIndexToToogleDone] = taskToToogle;
      setTasks(updatedTasks);
    } 
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})