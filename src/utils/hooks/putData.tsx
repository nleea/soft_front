import { useCallback, useState } from "react";
import { instance } from "../instance";

interface ErrorResponse {
    data: any;
    status: number;
}

interface ErrorRequest {
    request: any;
}

type interfaceError = ErrorResponse | ErrorRequest;

const PutFetch = <C extends any>() => {
    const [data, setData] = useState<C>();
    const [error, setError] = useState<interfaceError>();

    const fetch = async (url: string, body: any) => {
        let response = null;
        let response_error = null;
        try {
            const data = await (await instance.put(url, body)).data
            response = data
        } catch (error: any) {
            response_error = error.response.data
            console.log("Error", error);
        }

        return {response,response_error}
    };

    return { error, fetch, data };
};

export { PutFetch };
