import axios from "axios"

const onRequestSeccuss = config => {
    const token = localStorage.getItem('market-token')
    const url_server="http://localhost:8082/";
    if(token) {
        if (!config.headers) {
            config.headers = {}
        }
        config.headers.Authorization = `Bearer ${token}`;
    }
        config.url = `${url_server}${config.url}`
        return  config;

}

const  setAxiosInter = onUnauthenticated => {
    const onResponseError = err =>{
        console.log(JSON.stringify(err))
        const status = err.status || err.response.status
        if(status===403||status===401){
            onUnauthenticated();
        }
        return Promise.reject(err)
    }
    if(axios.interceptors){
        axios.interceptors.request.use(onRequestSeccuss);
        axios.interceptors.response.use(res => res,onResponseError);
    }
}
export {onRequestSeccuss,setAxiosInter}