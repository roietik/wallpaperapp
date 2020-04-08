import axios from 'axios';

// const val = 'london';

// const BASE_URL = `https://api.unsplash.com/search/photos?query=${val}&per_page=10&client_id=JUJUG3Twt95_7T4d0wFe3oVPXRAG2MzW5V6N6cIbWic`;

const Axios = {
  getUnsplash: async (url) => {
    console.log('url', url);
    const res = await axios.get(url);
    const result = res.data;
    return result;
  },
};

export default Axios;
