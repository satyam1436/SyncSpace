const JUDGE0_URL =
    process.env.JUDGE0_URL ||
    "https://ce.judge0.com";

const LANGUAGE_IDS = {
    javascript: 63,
    python: 71,
    java: 62,
    cpp: 54,
    c: 50,
    typescript: 74,
    go: 60,
    rust: 73,
};

const sleep = (ms) =>
    new Promise((resolve) =>
        setTimeout(resolve, ms)
    );

const getHeaders = () => {
    const headers = {
        "Content-Type":
            "application/json",
    };

    if (
        process.env.JUDGE0_AUTH_TOKEN
    ) {
        headers["X-Auth-Token"] =
            process.env.JUDGE0_AUTH_TOKEN;
    }

    return headers;
};

export const executeCode = async ({
    language,
    sourceCode,
    stdin = "",
}) => {
    const languageId =
        LANGUAGE_IDS[language];

    if (!languageId) {
        const error = new Error(
            `Unsupported language: ${language}`
        );

        error.statusCode = 400;
        error.errorCode =
            "UNSUPPORTED_LANGUAGE";

        throw error;
    }

    const submissionResponse =
        await fetch(
            `${JUDGE0_URL}/submissions/?base64_encoded=false&wait=false`,
            {
                method: "POST",

                headers: getHeaders(),

                body: JSON.stringify({
                    language_id:
                        languageId,

                    source_code:
                        sourceCode,

                    stdin,

                    cpu_time_limit: 3,

                    wall_time_limit: 5,

                    memory_limit:
                        128000,
                }),
            }
        );

    const submissionData =
        await submissionResponse.json();

    if (!submissionResponse.ok) {
        const error = new Error(
            submissionData.error ||
            submissionData.message ||
            "Code submission failed"
        );

        error.statusCode =
            submissionResponse.status;

        error.errorCode =
            "CODE_SUBMISSION_FAILED";

        throw error;
    }

    const token =
        submissionData.token;

    if (!token) {
        const error = new Error(
            "Judge0 did not return a submission token"
        );

        error.statusCode = 502;
        error.errorCode =
            "NO_SUBMISSION_TOKEN";

        throw error;
    }

    const maxAttempts = 20;

    for (
        let attempt = 0;
        attempt < maxAttempts;
        attempt++
    ) {
        await sleep(500);

        const resultResponse =
            await fetch(
                `${JUDGE0_URL}/submissions/${token}?base64_encoded=false`,
                {
                    method: "GET",
                    headers: getHeaders(),
                }
            );

        const result =
            await resultResponse.json();

        if (!resultResponse.ok) {
            const error = new Error(
                result.error ||
                result.message ||
                "Failed to fetch execution result"
            );

            error.statusCode =
                resultResponse.status;

            error.errorCode =
                "CODE_RESULT_FAILED";

            throw error;
        }

        const statusId =
            result.status?.id;

        // 1 = In Queue
        // 2 = Processing
        if (
            statusId !== 1 &&
            statusId !== 2
        ) {
            return {
                stdout:
                    result.stdout || "",

                stderr:
                    result.stderr || "",

                compileOutput:
                    result.compile_output ||
                    "",

                message:
                    result.message ||
                    "",

                status:
                    result.status || null,

                time:
                    result.time || null,

                memory:
                    result.memory || null,
            };
        }
    }

    const error = new Error(
        "Code execution timed out"
    );

    error.statusCode = 408;
    error.errorCode =
        "CODE_EXECUTION_TIMEOUT";

    throw error;
};