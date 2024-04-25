require('dotenv').config();

import { AllNotification } from "../../types";
import { fcmHandler } from "./handlers/fcmHandler";
import { telegramHandler } from "./handlers/telegramHandler";

export async function Notify(params: AllNotification) {

    if (!params.type) throw new Error("Notification type not defined.");

    switch (params.type) {

        /** */
        case 'fcm':
            return fcmHandler(params);
        
        /** */
        case 'telegramBot':
            return telegramHandler(params);
        
        /** */
        default:
            throw new Error("Notification type not supported.");
    }
}