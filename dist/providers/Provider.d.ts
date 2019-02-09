import NotificationType from '../types/NotificationType';
export interface IProviderOptions {
    globalPrefix: string;
}
declare class Provider {
    protected globalPrefix: string;
    constructor(options: IProviderOptions);
    /**
     * sendMessage Send Message
     */
    sendMessage(message: string, notificationType?: NotificationType): void;
}
export default Provider;
