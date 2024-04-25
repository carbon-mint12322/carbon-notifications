import { ServiceAccount } from "firebase-admin";
import { Message } from "firebase-admin/lib/messaging/messaging-api"

export interface INotification {
    type: string
}

export type FcmNotificationT = INotification & { type: 'fcm' } & { message: Message } & { credentials: Required<ServiceAccount> };

export type TelegramBotNotificationT = INotification & { type: 'telegramBot' } & { 
    token: string
    chatId: string
    text : string
 }


export type AllNotification = FcmNotificationT | TelegramBotNotificationT