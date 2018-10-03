import request from '../utils/request';

const getSkaters = () => {
  return request('https://the-sim-api.now.sh');
}

export default {
  getSkaters
}
