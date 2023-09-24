import axios from 'axios';
import Config from '../utils/config';

const ErrorService = {
  getAll,
};

async function getAll(data) {
  return axios.get(`${Config.AWS_API_URL}/errors`);
}
export default ErrorService;
