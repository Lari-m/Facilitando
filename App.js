import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [categories, setCategories] = useState([]);

  // Função para adicionar uma nova tarefa com categoria
  const addTask = () => {
    if (task.trim() !== '' && category.trim() !== '') {
      // Se a categoria for nova, adiciona à lista de categorias
      if (!categories.includes(category)) {
        setCategories([...categories, category]);
      }
      // Adiciona a tarefa à lista
      setTaskList([...taskList, { key: Math.random().toString(), task, category, completed: false }]);
      setTask('');
      setCategory('');
    }
  };

  // Função para remover uma tarefa
  const removeTask = (taskKey) => {
    setTaskList(taskList.filter((item) => item.key !== taskKey));
  };

  // Função para alternar o estado de "feito" de uma tarefa
  const toggleTaskComplete = (taskKey) => {
    setTaskList(
      taskList.map((item) =>
        item.key === taskKey ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Renderizar as tarefas agrupadas por categoria
  const renderTasksByCategory = () => {
    return categories.map((cat) => (
      <View key={cat}>
        <Text style={styles.categoryTitle}>{cat}</Text>
        <FlatList
          data={taskList.filter((taskItem) => taskItem.category === cat)}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              <TouchableOpacity onPress={() => toggleTaskComplete(item.key)}>
                <View style={[styles.checkbox, item.completed && styles.checked]} />
              </TouchableOpacity>
              <Text style={[styles.taskText, item.completed && styles.completedTask]}>{item.task}</Text>
              <TouchableOpacity onPress={() => removeTask(item.key)}>
                <Text style={{ color: 'red' }}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    ));
  };

  return (
    <View style={{ padding: 20 }}>
      {/* Campo de input para a tarefa */}
      <TextInput
        placeholder="Adicione uma tarefa"
        value={task}
        onChangeText={setTask}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      {/* Campo de input para a categoria */}
      <TextInput
        placeholder="Adicione uma categoria"
        value={category}
        onChangeText={setCategory}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Button title="Adicionar" onPress={addTask} />

      {/* Renderizando as tarefas agrupadas por categoria */}
      <FlatList
        ListHeaderComponent={() => (
          <View>
            {categories.length > 0 ? renderTasksByCategory() : <Text>Sem categorias</Text>}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
  },
  checked: {
    backgroundColor: 'green',
  },
  taskText: {
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default App;

