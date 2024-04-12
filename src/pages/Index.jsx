// Complete the Index page component for a basic Todo App
import { useState } from "react";
import { Box, Input, Button, List, ListItem, IconButton, Text, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const toast = useToast();

  const handleAddTask = () => {
    if (input.trim() === "") {
      toast({
        title: "No task entered",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newTask = {
      id: Date.now(),
      text: input,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)));
  };

  return (
    <Box p={5}>
      <Box mb={4}>
        <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleAddTask()} />
        <Button leftIcon={<FaPlus />} colorScheme="blue" ml={2} onClick={handleAddTask}>
          Add Task
        </Button>
      </Box>
      <List spacing={3}>
        {tasks.map((task) => (
          <ListItem key={task.id} display="flex" alignItems="center" justifyContent="space-between">
            <Text as={task.isCompleted ? "s" : ""} fontSize="lg">
              {task.text}
            </Text>
            <Box>
              <IconButton icon={<FaCheck />} colorScheme="green" mr={2} onClick={() => handleToggleComplete(task.id)} aria-label="Complete task" />
              <IconButton icon={<FaTrash />} colorScheme="red" onClick={() => handleDeleteTask(task.id)} aria-label="Delete task" />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;
