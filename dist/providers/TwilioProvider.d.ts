import Provider, { IProviderOptions } from './Provider';
import NotificationType from '../types/NotificationType';
export interface ITwilioOptions {
    accountSID: string;
    authToken: string;
    fromNumber: string;
    toNumber: string | string[];
}
declare class TwilioProvider extends Provider {
    private options;
    private client;
    constructor(providerOptions: IProviderOptions, options: ITwilioOptions);
    sendMessage(message: string, notificationType: NotificationType): Promise<any>;
    private init;
}
export default TwilioProvider;
