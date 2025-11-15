function TaskCounter({ completedCount, totalCount }) {
    return (
        <div className="overall-class-counter">
            <img src="/assets/check_icon.png" alt="Check Icon" />
            <p>{completedCount}/{totalCount}</p>
        </div>
    );
}

export default TaskCounter;
