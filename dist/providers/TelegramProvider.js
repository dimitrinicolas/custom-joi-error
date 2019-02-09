"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const Provider_1 = require("./Provider");
const prefixMessage_1 = require("../helpers/prefixMessage");
class TelegramProvider extends Provider_1.default {
    constructor(providerOptions, options) {
        super(providerOptions);
        this.options = options;
    }
    sendMessage(message, notificationType) {
        let chatIds;
        if (typeof this.options.chatId === 'string') {
            chatIds = [this.options.chatId];
        }
        else {
            chatIds = this.options.chatId;
        }
        return Promise.all(chatIds.map(chatId => new Promise((resolve, reject) => {
            const url = `https://api.telegram.org/bot${this.options.botToken}/sendmessage?chat_id=${chatId}&parse_mode=markdown&text=${encodeURIComponent(prefixMessage_1.default(this.globalPrefix, message, notificationType))}`;
            node_fetch_1.default(url)
                .then(response => {
                response
                    .json()
                    .then(result => {
                    if (result.ok !== true) {
                        reject(new Error(`TelegramProvider API Error: ${result.description}`));
                        return;
                    }
                    resolve({
                        provider: 'telegram',
                        success: true
                    });
                })
                    .catch(reject);
            })
                .catch(reject);
        })));
    }
}
exports.default = TelegramProvider;
