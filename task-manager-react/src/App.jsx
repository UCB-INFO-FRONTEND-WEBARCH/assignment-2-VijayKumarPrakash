import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskCounter from './components/TaskCounter';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');

    // Add a new task
    const handleAddTask = (taskText) => {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };
        setTasks([...tasks, newTask]);
    };

    // Toggle task completion status
    const handleToggleTask = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    // Delete a task
    const handleDeleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    // Filter tasks based on the current filter
    const getFilteredTasks = () => {
        if (filter === 'active') {
            return tasks.filter((task) => !task.completed);
        } else if (filter === 'completed') {
            return tasks.filter((task) => task.completed);
        }
        return tasks; // 'all'
    };

    const filteredTasks = getFilteredTasks();

    // Calculate counter display based on current filter
    const getCounterDisplay = () => {
        if (filter === 'active') {
            return { completed: 0, total: filteredTasks.length };
        } else if (filter === 'completed') {
            return { completed: filteredTasks.length, total: filteredTasks.length };
        }
        // 'all' - show completed/total
        const completedCount = tasks.filter((task) => task.completed).length;
        return { completed: completedCount, total: tasks.length };
    };

    const counterDisplay = getCounterDisplay();

    return (
        <>
            <header className="main-header">
                <img src="/assets/menu_icon.png" alt="Menu Icon" />
                <div id="search-bar-element">
                    <img src="/assets/search_icon.png" alt="Search Icon" />
                    <input type="text" id="search-term" placeholder="Quick Find..." />
                </div>
                <TaskCounter completedCount={counterDisplay.completed} totalCount={counterDisplay.total} />
            </header>

            <article>
                <nav className="sidebar">
                    <ul>
                        <li>
                            <img src="/assets/inbox_icon.png" alt="Inbox Icon" />
                            <a href="#">
                                <strong>Inbox</strong>
                            </a>
                            <span className="task-count">{tasks.length}</span>
                        </li>
                        <li>
                            <img src="/assets/calendar_icon.png" alt="Today Icon" />
                            <a href="#">Today</a>
                            <span className="task-count">{tasks.length}</span>
                        </li>
                        <li>
                            <img src="/assets/upcoming_icon.png" alt="Upcoming Icon" />
                            <a href="#">Upcoming</a>
                        </li>
                    </ul>
                </nav>

                <main className="main-content">
                    <h1>Inbox</h1>
                    <TaskForm onAddTask={handleAddTask} />

                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </button>
                        <button
                            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                            onClick={() => setFilter('active')}
                        >
                            Active
                        </button>
                        <button
                            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                            onClick={() => setFilter('completed')}
                        >
                            Completed
                        </button>
                    </div>

                    <TaskList
                        tasks={filteredTasks}
                        onToggle={handleToggleTask}
                        onDelete={handleDeleteTask}
                    />
                </main>
            </article>

            <footer>
                <p>&copy; 2025 Vijay Kumar Prakash</p>
            </footer>
        </>
    );
}

export default App;
