//------------------Local---------------------
const url = 'localhost';
const port = '8080';
const serverProtocol = 'http';

export const environment = {
  production: false,
  api_url: `${serverProtocol}://${url}:${port}/api/`,
  image_upload_urls: `${serverProtocol}://${url}:${port}/api/image/upload`,
  image_load_url: {
    fullImg: `${serverProtocol}://${url}:${port}/uploads/`,
    size100: `${serverProtocol}://${url}:${port}/uploads/100/`,
    size200: `${serverProtocol}://${url}:${port}/uploads/200/`,
    size300: `${serverProtocol}://${url}:${port}/uploads/300/`,
  },
};
