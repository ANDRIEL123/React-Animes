import axios from 'axios'


const ApiGoogleV2 = axios.create({
    baseURL: 'https://www.googleapis.com/drive/v2/files/'
})

export default ApiGoogleV2;

