import test from 'ava';

import Joi from 'joi';
import customJoiError from '.';

test('Standard test', async t => {
  const validation = Joi.validate(
    { firstName: '' },
    {
      firstName: Joi.string()
        .not()
        .empty()
        .label('The first name')
    }
  );

  t.is(
    customJoiError(validation, {
      language: {
        firstName: {
          'any.empty': 'Please enter a first name'
        }
      }
    }).message,
    'Please enter a first name'
  );
});

test('Multiple errors', async t => {
  const validation = Joi.validate(
    { firstName: 1, lastName: 1 },
    { firstName: Joi.string(), lastName: Joi.string() },
    { abortEarly: false }
  );

  t.is(
    customJoiError(validation, {
      language: {
        firstName: {
          'string.base': 'Custom message 1'
        },
        lastName: {
          'string.base': 'Custom message 2'
        }
      }
    }).message,
    'Custom message 1, Custom message 2'
  );
});

test('No quotes stripping', async t => {
  const validation = Joi.validate(
    { firstName: 1 },
    {
      firstName: Joi.string()
    }
  );

  t.is(
    customJoiError(validation, {
      stripQuotes: false
    }).message,
    '"firstName" must be a string'
  );
});

test('No config', async t => {
  const validation = Joi.validate(
    { firstName: 1 },
    {
      firstName: Joi.string()
    }
  );

  t.is(customJoiError(validation).message, 'firstName must be a string');
});

test('Non complete language config', async t => {
  const validation = Joi.validate(
    { firstName: 1 },
    {
      firstName: Joi.string()
    }
  );

  t.is(
    customJoiError(validation, { language: { firstName: {} } }).message,
    'firstName must be a string'
  );
});

test('Language path shortcut', async t => {
  const validation = Joi.validate(
    { firstName: 1 },
    {
      firstName: Joi.string()
    }
  );

  t.is(
    customJoiError(validation, {
      language: { firstName: { 'string.base': 'Custom message' } }
    }).message,
    'Custom message'
  );
});
