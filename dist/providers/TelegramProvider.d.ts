import Provider, { IProviderOptions } from './Provider';
import NotificationType from '../types/NotificationType';
export interface ITelegramOptions {
    botToken: string;
    chatId: string | string[];
}
declare class TelegramProvider extends Provider {
    private options;
    constructor(providerOptions: IProviderOptions, options: ITelegramOptions);
    sendMessage(message: string, notificationType: NotificationType): Promise<any>;
}
export default TelegramProvider;
