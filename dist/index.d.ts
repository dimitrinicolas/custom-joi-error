import { LanguageRootOptions, ValidationErrorItem, ValidationResult } from 'joi';
declare class CustomValidationError extends Error {
    details: ValidationErrorItem[];
    constructor(options: {
        message: string;
        details: ValidationErrorItem[];
    });
}
interface IOptions {
    stripQuotes?: boolean;
    language?: {
        [key: string]: LanguageRootOptions;
    };
}
declare const customJoiError: (validationResult: ValidationResult<any>, { stripQuotes, language }?: IOptions) => CustomValidationError;
export default customJoiError;
