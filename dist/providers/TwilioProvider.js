"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = require("twilio");
const Provider_1 = require("./Provider");
const prefixMessage_1 = require("../helpers/prefixMessage");
class TwilioProvider extends Provider_1.default {
    constructor(providerOptions, options) {
        super(providerOptions);
        this.options = options;
        this.init();
    }
    sendMessage(message, notificationType) {
        let toNumbers;
        if (typeof this.options.toNumber === 'string') {
            toNumbers = [this.options.toNumber];
        }
        else {
            toNumbers = this.options.toNumber;
        }
        if (!this.client) {
            return Promise.reject();
        }
        return Promise.all(toNumbers.map(to => new Promise((resolve, reject) => {
            this.client.messages
                .create({
                body: prefixMessage_1.default(this.globalPrefix, message, notificationType),
                from: this.options.fromNumber,
                to
            })
                .then(() => {
                resolve({
                    provider: 'twilio',
                    success: true
                });
            })
                .catch(reject);
        })));
    }
    init() {
        try {
            this.client = new twilio_1.Twilio(this.options.accountSID, this.options.authToken);
        }
        catch (error) { }
    }
}
exports.default = TwilioProvider;
