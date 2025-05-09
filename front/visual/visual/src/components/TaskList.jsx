import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDelete }) => {
  return (
    <ul className="space-y-2">
      {tasks.map((tarea) => (
        <TaskItem key={tarea.id} tarea={tarea} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default TaskList;