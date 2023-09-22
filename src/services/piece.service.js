import axios from 'axios';
import Config from '../utils/config';

const PieceService = {
  uploadFile,
};

async function uploadFile(file) {
  const contentType = getContentType(file.name);

  const fileBuffer = await readFileAsync(file);

  const objectKey = `${file.name}`;

  const axiosConfig = {
    method: 'put', // Use PUT method
    url: `${Config.API_UPLOAD_PIECE}/${objectKey}`,
    data: fileBuffer,
    headers: {
      'Content-Type': contentType,
      'x-amz-acl': 'public-read',
    },
  };

  return axios(axiosConfig);
}

function getContentType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.pdf':
      return 'application/pdf';
    default:
      return 'application/octet-stream'; // Default to binary data if the extension is not recognized
  }
}

function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}

export default PieceService;
