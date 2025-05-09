import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { listarTasks, eliminarTask } from './api';

function App() {
  const [tasks, setTasks] = useState([]);

  const cargarTasks = async () => {
    try {
      const res = await listarTasks();
      setTasks(res.data);
    } catch (error) {
      console.error('Error cargando tareas:', error);
    }
  };

  const eliminar = async (id) => {
    try {
      await eliminarTask(id);
      await cargarTasks();
    } catch (error) {
      console.error('Error eliminando tarea:', error);
      alert('Error al eliminar tarea');
    }
  };

  useEffect(() => {
    cargarTasks();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Lista de Tareas</h1>
      <TaskForm onTaskAdded={cargarTasks} />
      <TaskList tasks={tasks} onDelete={eliminar} />
    </div>
  );
}

export default App;