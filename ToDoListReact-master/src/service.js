// import axios from 'axios';

// // const apiUrl = "http://localhost:5047";
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// axios.interceptors.response.use(
//   response => response, 
//   error => {
//     console.error('API Error:', error.response ? error.response.data : error.message);
//     return Promise.reject(error); 
//   }
// );

// export default {
//   getTasks: async () => {
//     console.log(process.env.REACT_APP_API_URL);

//     const result = await axios.get(`/items`)    
//     // const result = await axios.get(`${apiUrl}/items`)    
//     return result.data;
//   },

//   addTask: async (name) => {
    
//     console.log('addTask', name)
//       const result = await axios.post(`/items`,
//        { Name:name,
//         IsComplete:false
//         })

//     return {result};
//   },

//   setCompleted: async (id, isComplete) => {
    
//     console.log('setCompleted', {id, isComplete})
//       const result = await axios.put(`/items/${id}?iscomplete=${isComplete}`, 
//       {})
//     return {result};
//   },

//   deleteTask: async (id) => {
//     console.log('deleteTask')
//     const result = await axios.delete(`/items/${id}`)
 
//   }
// };
import axios from './api';

export default {

  getTasks: async () => {
    console.log(process.env.REACT_APP_API_URL);
    
    const result = await axios.get(`/items`)    
    return result.data;
  },


  addTask: async(name)=>{
    console.log('addTask', name)
    //TODO
    const result = await axios.post(`/`,{
      Name:name,
      IsComplete:false
    })    
    return {result};
  },



  setCompleted: async(id, isComplete)=>{
    console.log('setCompleted', {id, isComplete})
    console.log('setCompleted', { id, isComplete });
    const result = await axios.put(`/items/${id}?iscomplete=${isComplete}`, {
    });
      
    return {result};
  },

  deleteTask:async(id)=>{
    console.log('deleteTask')

    const result = await axios.delete(`/items/${id}`, {
    });

  }
};
