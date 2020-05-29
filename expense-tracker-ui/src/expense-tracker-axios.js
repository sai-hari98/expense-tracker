import axios from 'axios';

const expenseTrackerAxios = axios.create();

expenseTrackerAxios.defaults.baseURL = "http://localhost:8090"

export default expenseTrackerAxios;