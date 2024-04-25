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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notify = void 0;
require('dotenv').config();
const fcmHandler_1 = require("./handlers/fcmHandler");
const telegramHandler_1 = require("./handlers/telegramHandler");
function Notify(params) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!params.type)
            throw new Error("Notification type not defined.");
        switch (params.type) {
            /** */
            case 'fcm':
                return (0, fcmHandler_1.fcmHandler)(params);
            /** */
            case 'telegramBot':
                return (0, telegramHandler_1.telegramHandler)(params);
            /** */
            default:
                throw new Error("Notification type not supported.");
        }
    });
}
exports.Notify = Notify;
