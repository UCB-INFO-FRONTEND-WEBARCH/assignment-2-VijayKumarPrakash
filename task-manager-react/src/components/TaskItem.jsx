function TaskItem({ task, onToggle, onDelete }) {
    return (
        <li className="task-item">
            <div className="task-item-content">
                <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                />
                <p className={`task-item-text ${task.completed ? 'completed' : ''}`}>
                    {task.text}
                </p>
            </div>
            <button
                className="task-item-delete"
                onClick={() => onDelete(task.id)}
                title="Delete task"
            >
                ×
            </button>
        </li>
    );
}

export default TaskItem;
