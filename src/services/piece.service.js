import axios from 'axios';
import Config from '../utils/config';

const PieceService = {
  getAll,
  uploadFile,
};

async function uploadFile(data) {
  return axios.post(`${Config.AWS_API_URL}/upload`, data);
}

async function getAll(data) {
  return axios.get(`${Config.AWS_API_URL}/pieces`);
}
export default PieceService;
