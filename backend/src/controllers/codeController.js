import {
    executeCode as executeCodeService,
} from "../services/codeService.js";

export const executeCode = async (
    req,
    res,
    next
) => {
    try {
        const {
            language,
            sourceCode,
            stdin = "",
        } = req.body;

        if (!language) {
            const error = new Error(
                "Language is required"
            );

            error.statusCode = 400;
            error.errorCode =
                "LANGUAGE_REQUIRED";

            throw error;
        }

        if (
            !sourceCode ||
            !sourceCode.trim()
        ) {
            const error = new Error(
                "Source code is required"
            );

            error.statusCode = 400;
            error.errorCode =
                "SOURCE_CODE_REQUIRED";

            throw error;
        }

        const result =
            await executeCodeService({
                language,
                sourceCode,
                stdin,
            });

        return res.status(200).json({
            success: true,
            message:
                "Code executed successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};