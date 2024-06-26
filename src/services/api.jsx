import axios from 'axios'
// BASE DA URL https://api.themoviedb.org/3/
// URL DA API /movie/now_playing?api_key=04ef14498df2f0f341096486eb13b7e0
 const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
 });
 export default api