import api from "./axios";

export const executeCode = async ({
    language,
    sourceCode,
    stdin = "",
}) => {
    const response = await api.post(
        "/v1/code/execute",
        {
            language,
            sourceCode,
            stdin,
        }
    );

    return response.data;
};