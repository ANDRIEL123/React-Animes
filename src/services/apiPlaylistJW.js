import axios from 'axios'


const apiPlayList = axios.create({
    baseURL: 'https://cdn.jwplayer.com/v2/playlists/'
})

export default apiPlayList;

