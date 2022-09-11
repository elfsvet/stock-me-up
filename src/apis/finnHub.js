import axios from "axios";

const TOKEN = 'ccei97iad3i6bee10o90'

export default axios.create({
    baseURL: 'https://finnhub.io/api/v1',
    params: {
        token:TOKEN
    }
})