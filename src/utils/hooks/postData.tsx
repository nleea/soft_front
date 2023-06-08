
import { instance } from "../instance";


const PostFetch = <C extends any>() => {


    const fetch = async (url: string, body: any) => {
        let response: C = {} as C;
        let response_error = null;
        try {
            const data = await (await instance.post(url, body)).data
            response = data
        } catch (error: any) {
            response_error = error.response.data
            console.log("Error", error);
        }

        return { response, response_error }
    };

    return { fetch };
};

export { PostFetch };
