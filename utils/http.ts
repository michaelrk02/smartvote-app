import axios from "axios";
import useSWR from "swr";

const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

const httpFetcher = (url: string) => axios.get(url).then((res) => res.data);

function useData<T>(api: string) {
    return useSWR<T>(api, httpFetcher);
}

export {
    useData
}

export default http
