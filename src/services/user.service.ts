import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://77.223.98.75:1337/api/';

class UserService {
  createUser(email:string, username:string, password:string) {

    return axios.post(API_URL + 'user/create/', {
        email: email,
        username:username,
        password: password,
    })
  }

  createTest() {
    return axios.get(API_URL + 'test/create/', { headers: authHeader() });
  }

  getTest(id:number) {
    return axios.get(API_URL + 'test/'+ id + '/', { headers: authHeader() });
  }

  refreshToken(token:string) {
    return axios.post(API_URL + "token/refresh/", { 'refresh':token });
  }

  sendAnswers(id:number,simpletestresult:object[]) {
    return axios.put(API_URL + 'test/'+ id + '/', 
      {"SimpleTest":[{"simpletestresult":simpletestresult}]}, { headers: authHeader()}
       ) 
  };

}

export default new UserService();
