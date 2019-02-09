import {
  LanguageRootOptions,
  ValidationErrorItem,
  ValidationResult
} from 'joi';
import objectPath = require('object-path');

class CustomValidationError extends Error {
  public details: ValidationErrorItem[];

  constructor(options: { message: string; details: ValidationErrorItem[] }) {
    super(options.message);
    this.details = options.details;
  }
}

interface IOptions {
  stripQuotes?: boolean;
  language?: {
    [key: string]: LanguageRootOptions;
  };
}

const customJoiError = (
  validationResult: ValidationResult<any>,
  { stripQuotes = true, language = {} }: IOptions = {}
) => {
  const details = validationResult.error.details.map(detail => {
    const specificLanguage = language[detail.path.join('.')];
    if (specificLanguage) {
      const message =
        specificLanguage[detail.type] ||
        objectPath.get(specificLanguage, detail.type);

      if (message) {
        return {
          ...detail,
          message
        };
      }
    }

    return {
      ...detail,
      message: stripQuotes
        ? detail.message.replace(/^"([^"]*)"/, '$1')
        : detail.message
    };
  });
  return new CustomValidationError({
    message: details.map(detail => detail.message).join(', '),
    details
  });
};

export default customJoiError;
