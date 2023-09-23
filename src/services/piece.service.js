import axios from 'axios';
import Config from '../utils/config';

const PieceService = {
  uploadFile,
};

async function uploadFile(data) {
  return axios.post(`${Config.AWS_API_URL}/upload`, data);
}

export default PieceService;
