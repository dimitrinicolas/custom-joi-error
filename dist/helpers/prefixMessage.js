"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messagePrefixes_1 = require("./messagePrefixes");
const prefixMessage = (globalPrefix, message, notificationType) => `${globalPrefix}${messagePrefixes_1.default[notificationType] || ''} ${message}`;
exports.default = prefixMessage;
