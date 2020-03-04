import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export const getArticles = () => axios.get(BASE_URL);
