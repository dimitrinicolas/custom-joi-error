# custom-joi-error [![Build Status][ci badge]][ci link] [![Coverage Status][coverage badge]][coverage link]

Customize Joi errors, by stripping quotes and setting key specific error
language.

## Installation

```bash
npm install custom-joi-error
```

## Usage

Call `customJoiError` function with Joi's validation result as first arguments.

You can pass [options](#options) as second argument.

```javascript
const customJoiError = require('custom-joi-error');
/** Or with ES6+ */
import customJoiError from 'custom-joi-error';

const result = Joi.validate(
  { firstName: '', lastName: 10 },
  {
    firstName: Joi.string()
      .not()
      .empty()
      .label('Fist name'),
    lastName: Joi.string()
      .not()
      .empty()
      .label('Last name')
  }
);

if (result.error) {
  throw customJoiError(result, {
    language: {
      firstName: {
        'any.empty': 'Please enter a first name'
      }
    }
  });
}
```

It will return:

```javascript
Error (CustomValidationError) {
  message: 'Please enter a first name, Last name must be a string',
  details: [
    {
      message: 'Please enter a first name',
      path: [ 'firstName' ],
      type: 'any.empty',
      context: {
        value: '',
        invalids: [ '' ],
        key: 'firstName',
        label: 'First name'
      },
    },
    {
      message: 'Last name must be a string',
      path: [ 'lastName' ],
      type: 'any.empty',
      context: {
        value: 10,
        key: 'lastName',
        label: 'Last name'
      },
    },
  ],
}
```

## Options

- `stripQuotes` (default: `true`) Remove quote from key label in error message.
- `language` (default: `{}`) Set key specific error message, example :

```javascript
{
  language: {
    name: {
      string: {
        email: 'Please enter a valid email'
      }
    }
  }
}
```

See
[Joi language file](https://github.com/hapijs/joi/blob/master/lib/language.js)
for full messages list.

## Build

```bash
npm run build
```

## Testing

```bash
npm test
```

## Related

- [joi][joi] - Object schema validation

## License

This project is licensed under the [MIT license](LICENSE).

[ci badge]: https://travis-ci.org/dimitrinicolas/custom-joi-error.svg?branch=master
[ci link]: https://travis-ci.org/dimitrinicolas/custom-joi-error
[coverage badge]: https://coveralls.io/repos/github/dimitrinicolas/custom-joi-error/badge.svg?branch=master
[coverage link]: https://coveralls.io/github/dimitrinicolas/custom-joi-error?branch=master
[joi]: https://github.com/hapijs/joi
