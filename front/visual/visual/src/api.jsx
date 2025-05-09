import axios from 'axios';

const API = 'http://localhost:3000/tasks';

export const listarTasks = () => axios.get(API);
export const crearTask = (task) => axios.post(API, task);
export const actualizarTask = (id, titulo, estado) => 
  axios.put(`${API}/${id}`, { title: titulo, estado });
export const eliminarTask = (id) => axios.delete(`${API}/${id}`);