import { useState } from 'react';
import { crearTask } from '../api';

export default function TaskForm({ onTaskAdded }) {
  const [titulo, setTitulo] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    
    try {
      await crearTask({ title: titulo });
      setTitulo('');
      onTaskAdded();
    } catch (error) {
      console.error('Error creando tarea:', error);
      alert('Error al crear tarea');
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="mb-4 flex gap-2">
      <input
        type="text"
        className="border px-3 py-2 rounded w-full"
        placeholder="Nueva tarea"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded">
        Guardar
      </button>
    </form>
  );
}