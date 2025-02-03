import axios from 'axios';

const apiUrl = "http://localhost:5047";
axios.defaults.baseURL = "http://localhost:5047";
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.response.use(
  response => response, 
  error => {
    console.error('API Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error); 
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get(`/items`)    
    // const result = await axios.get(`${apiUrl}/items`)    
    return result.data;
  },

  addTask: async (name) => {
      const result = await axios.post(`/items`,
        // const result = await axios.post(`${apiUrl}/items`,
       { Name:name,
        IsComplete:false
        })

    return {result};
  },

  setCompleted: async (id, isComplete) => {
      const result = await axios.put(`/items/${id}`, 
        // const result = await axios.put(`${apiUrl}/items/${id}`, 
      {IsComplete: isComplete })
    return {result};
  },

  deleteTask: async (id) => {
    const result = await axios.delete(`/items/${id}`)
    // const result = await axios.delete(`${apiUrl}/items/${id}`)
    console.log('deleteTask')
  }
};