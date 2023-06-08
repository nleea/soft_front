import { instance } from "../instance";
import { useCallback, useState } from "react";

interface ErrorResponse {
    data: any;
    status: number;
}

interface ErrorRequest {
    request: any;
}

type interfaceError = ErrorResponse | ErrorRequest;

const GetFetch = <C extends any>() => {
    const [data, setData] = useState<C>();
    const [error, setError] = useState<interfaceError>();

    const fetch = useCallback(async (url: string, header?: any) => {
        try {

            const data = await (
                await instance.get(url, header)
            ).data;
            setData(data);
        } catch (error: any) {
            if (error.response) {
                setError({ data: error.response.data, status: error.response.status });
            } else if (error.request) {
                setError({ request: error.request });
            } else {
                console.log("Error", error.message);
            }
        }
    }, []);


    return { error, fetch, data };
};

export { GetFetch };
