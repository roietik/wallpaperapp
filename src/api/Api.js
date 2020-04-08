import axios from 'axios';

const Axios = {
  getUnsplash: async (url) => {
    const res = await axios.get(url);
    const result = res.data;
    return result;
  },
};

export default Axios;
