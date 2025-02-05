import axios from './api';
export default {
  getTasks: async () => {
    try {
      console.log(process.env.REACT_APP_API_URL);
      const result = await axios.get(`/items`);
      return result.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  addTask: async (name) => {
    try {
      console.log('addTask', name);
      const result = await axios.post(`/items`, {
        Name: name,
        IsComplete: false,
      });
      return { result };
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  },

  setCompleted: async (id, isComplete) => {
    try {
      console.log('setCompleted', { id, isComplete });
      const result = await axios.put(`/items/${id}?iscomplete=${isComplete}`, {});
      return { result };
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      console.log('deleteTask', id);
      const result = await axios.delete(`/items/${id}`);
      return { result };
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },
};
