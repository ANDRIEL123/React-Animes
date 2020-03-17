import axios from 'axios'


const apiRetornaPlayLists = axios.create({
    baseURL: 'https://api.jwplatform.com/v1/channels/videos/list'
})

export default apiRetornaPlayLists;

