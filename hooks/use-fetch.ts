import {useCallback, useState} from "react";

const useFetch = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, applyData: (data: any) => void) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                requestConfig.url,
                {
                    method: requestConfig.method,
                    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
                    headers: requestConfig.headers ? requestConfig.headers : {},
                    credentials: "include",
                    mode: requestConfig.mode ? requestConfig.mode : null
                }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();
            applyData(data);
        } catch (err: any) {
            setError(err.message || 'Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading, error, sendRequest
    }
}

export default useFetch;