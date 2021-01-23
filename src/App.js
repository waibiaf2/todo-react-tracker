/** @format */
// Pckage imports
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

// Parent React component
function App() {
    // Boolean used to hide or show the add task form
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);
    // Our primary data, the tasks array.
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        };
        getTasks();
    }, []);

    // Fetching tasks from our mock api.
    const fetchTasks = async () => {
        const res = await fetch("http://localhost:5000/tasks");
        const data = await res.json();
        // console.log(data);
        return data;
    };

    // Fetching a single task from our mock api.
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`);
        const data = await res.json();
        // console.log(data);
        return data;
    };

    // Add task
    const addTask = async (task) => {
        const res = await fetch("http://localhost:5000/tasks/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(task),
        });

        const data = await res.json();
        setTasks([...tasks, data]);
        // const id = Math.floor(Math.random() * 10000) + 1;
        // setTasks([...tasks, { id, ...task }]);
    };

    // Method for toggling showTaskForm state variable
    const toggleAddTaskForm = () => setShowAddTaskForm(!showAddTaskForm);

    // Delete task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "DELETE",
        });

        setTasks(tasks.filter((task) => task.id !== id));
    };

    // Toggle reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id);
        const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updTask),
        });

        const data = await res.json();

        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, reminder: data.reminder } : task,
            ),
        );
    };

    return (
        <Router>
            <div className="container">
                {/* Header component */}
                <Header
                    toggleAddTaskForm={toggleAddTaskForm}
                    showAdd={showAddTaskForm}
                />

                <Route
                    path="/"
                    exact
                    render={(props) => (
                        <>
                            {/* Add task form  */}
                            {showAddTaskForm && <AddTask onAdd={addTask} />}

                            {/* The task */}
                            {tasks.length > 0 ? (
                                <Tasks
                                    tasks={tasks}
                                    onDelete={deleteTask}
                                    onToggleReminder={toggleReminder}
                                />
                            ) : (
                                "You have no tasks added"
                            )}
                        </>
                    )}
                />
                <Route path="/about" component={About} />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
