import admin from 'firebase-admin';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';
import appRoot from 'app-root-path';
import { getApp, getApps, ServiceAccount, cert } from 'firebase-admin/app';
import { FcmNotificationT } from '../../../types';

const HANDLER = "fcmHandler";

export async function fcmHandler(params: FcmNotificationT) {

    const {
        credentials,
        message,
    } = params;

    // Initialize firebase admin auth
    if (!initializeFirebaseAdmin(credentials)) {
        throw new Error(`Firebase initialize failed ${HANDLER}`);
    }

    if (!message.notification && !message.data) throw new Error("Message not defined.")


    return admin.messaging().send(message);
}

function initializeFirebaseAdmin(googleServiceJson: ServiceAccount) {
    
    if (!googleServiceJson) throw new Error("Please add google-service.json for credentials.")
   
    getApps().length === 0 ? admin.initializeApp({
        credential: cert(googleServiceJson)
    }) : getApp();
    
    return true;
}

// function validate(notificationObject: FCMNotificationT) {

//     if (!(typeof notificationObject === "object")) {
//         throw new Error(`Notification Object is not valid, ${HANDLER}`);
//     }
    
//     const {
//         type,
//         token,

//         params
//     } = notificationObject;

//     if (!type) {
//         throw new Error(`Type not specified ${HANDLER}`);
//     }

//     if (!token) {
//         throw new Error(`DeviceTokens not specified ${HANDLER}`);
//     }
    
//     if (!(typeof params === "object")) {
//         throw new Error(`params not specified ${HANDLER}`);
//     }

   
//     if (!(validateFcmParamsData(params) || validateFcmParamsNotification(params))) {
//         throw new Error(`Params not valid ${HANDLER}`);
//     }
    
//     return true;
// }

// function validateFcmParamsData(params: FCMNotificationParams) {

//     const {
//         data,
//     } = params as FCMParamsData;


//     if (!data) return false;

//     if (!Object.keys(data).length) return false;

//     return true;
// }

// function validateFcmParamsNotification(params: FCMNotificationParams) {

//     const {
//         notification
//     } = params as FCMParamsNotification;

//     if (!notification) return false;

//     if (!notification.title) return false;

//     if (!notification.body) return false;

//     return true;
// }

// function initializeFirebaseAdmin(googleServiceJson: any) {
    
//     admin.initializeApp({
//         credential: admin.credential.cert(googleServiceJson)
//     });
    
//     return true;
// }


// type FCMParamsData = {
//     data: {
//         [key: string]: any
//     }
// }

// type FCMParamsNotification = {
//     notification: {
//         title: string
//         body: string,
//     }
// }

// export type FCMNotificationParams = FCMParamsData | FCMParamsNotification;

// export type MessageTargetParams = { token: string }
// | {condition: string}
// | {topic: string}

// export type FCMNotificationT = INotification
//     & {
//         type: "fcm"
//         params: FCMNotificationParams
//     }
//     & MessageTargetParams