import { useState } from 'react';
import { actualizarTask } from '../api';

export default function TaskItem({ tarea, onDelete }) {
  const [editando, setEditando] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState(tarea.title);

  const cambiarEstado = async () => {
    try {
      await actualizarTask(tarea.id, tarea.title, tarea.estado ? 0 : 1);
      onDelete();
    } catch (error) {
      console.error('Error actualizando estado:', error);
    }
  };

  const guardarCambios = async () => {
    try {
      await actualizarTask(tarea.id, nuevoTitulo, tarea.estado);
      setEditando(false);
      onDelete();
    } catch (error) {
      console.error('Error guardando cambios:', error);
    }
  };

  return (
    <div className="flex justify-between items-center border-b py-2">
      <div className="flex items-center gap-2 w-full">
        <input
          type="checkbox"
          checked={tarea.estado === 1}
          onChange={cambiarEstado}
        />
        {editando ? (
          <input
            className="border px-2 py-1 w-full"
            value={nuevoTitulo}
            onChange={(e) => setNuevoTitulo(e.target.value)}
          />
        ) : (
          <span className={tarea.estado ? 'line-through text-gray-500' : ''}>
            {tarea.title}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {editando ? (
          <button
            className="text-green-500 hover:underline"
            onClick={guardarCambios}
          >
            Guardar
          </button>
        ) : (
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setEditando(true)}
          >
            Editar
          </button>
        )}
        <button
          className="text-red-500 hover:underline"
          onClick={() => onDelete(tarea.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}