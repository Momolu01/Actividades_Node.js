import axios from "axios";

const API_URL = "http://localhost:8000/";
const RESOURCE = "tasks";

export const fechTasks = async() => {
  try{
    const tasks = await axios.get(`${API_URL}${RESOURCE}`);
    return tasks.data;
  }catch(error){
    console.log(error);
  }
}

export const postTask = async(task) => {
  try{
    //La lógica para hacer una solicitud/petición de tipo POST
    const response = await axios({
      url: `${API_URL}${RESOURCE}`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: task
    });
    return response;
  }catch(error){
    console.log(error);
  }
}

export const completeTask = async(id, taskObj) => {
  try{
    //La lógica para hacer una solicitud/petición de tipo PUT
    const response = await axios({
      url: `${API_URL}${RESOURCE}/${id}`,
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {type: 'completed', task: taskObj}
    });
    return response;
  }catch(error){
    console.log(error);
  }
}

export const updateTask = async(id, taskObj) => {
  try{
    //La lógica para hacer una solicitud/petición de tipo PUT
    const response = await axios({
      url: `${API_URL}${RESOURCE}/${id}`,
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {type: 'update', task: taskObj}
    });
    return response;
  }catch(error){
    console.log(error);
  }
}

export const deleteTask = async(id) => {
  try{
    //La lógica para hacer una solicitud/petición de tipo PUT
    const response = await axios({
      url: `${API_URL}${RESOURCE}/${id}`,
      method: 'delete',
      headers: {
        'Content-Type': 'Text/plain'
      },
      data: id
    });
    return response;
  }catch(error){
    console.log(error);
  }
}