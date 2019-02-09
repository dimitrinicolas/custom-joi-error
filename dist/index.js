"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objectPath = require("object-path");
class CustomValidationError extends Error {
    constructor(options) {
        super(options.message);
        this.details = options.details;
    }
}
const customJoiError = (validationResult, { stripQuotes = true, language = {} } = {}) => {
    const details = validationResult.error.details.map(detail => {
        const specificLanguage = language[detail.path.join('.')];
        if (specificLanguage) {
            const message = specificLanguage[detail.type] ||
                objectPath.get(specificLanguage, detail.type);
            if (message) {
                return Object.assign({}, detail, { message });
            }
        }
        return Object.assign({}, detail, { message: stripQuotes
                ? detail.message.replace(/^"([^"]*)"/, '$1')
                : detail.message });
    });
    return new CustomValidationError({
        message: details.map(detail => detail.message).join(', '),
        details
    });
};
exports.default = customJoiError;
