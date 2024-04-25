"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fcmHandler = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const app_1 = require("firebase-admin/app");
const HANDLER = "fcmHandler";
function fcmHandler(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { credentials, message, } = params;
        // Initialize firebase admin auth
        if (!initializeFirebaseAdmin(credentials)) {
            throw new Error(`Firebase initialize failed ${HANDLER}`);
        }
        if (!message.notification && !message.data)
            throw new Error("Message not defined.");
        return firebase_admin_1.default.messaging().send(message);
    });
}
exports.fcmHandler = fcmHandler;
function initializeFirebaseAdmin(googleServiceJson) {
    if (!googleServiceJson)
        throw new Error("Please add google-service.json for credentials.");
    (0, app_1.getApps)().length === 0 ? firebase_admin_1.default.initializeApp({
        credential: (0, app_1.cert)(googleServiceJson)
    }) : (0, app_1.getApp)();
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
