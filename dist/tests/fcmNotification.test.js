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
const assert_1 = __importDefault(require("assert"));
const Notification_1 = require("../lib/Notification");
function getTestDeviceRegistrationToken() {
    const token = process.env.TEST_DEVICE_REGISTRATION_TOKEN || null;
    if (!(token && token.length))
        throw new Error("Test device token not defined in env.");
    return token;
}
function getFcmCredentials() {
    return JSON.parse(process.env.GOOGLE_SERVICES_JSON_CREDENTIALS || "{}");
}
describe("FCM message flow testing", () => {
    it("Message should be sent", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, Notification_1.Notify)({
            type: 'fcm',
            message: {
                notification: {
                    title: "Hello world!",
                    body: "This is a test message on " + new Date().toISOString()
                },
                token: getTestDeviceRegistrationToken()
            },
            credentials: getFcmCredentials()
        });
        return assert_1.default.equal((typeof res === "string" && res.length > 0), true);
    }));
    it("No message passed: Message should fail", () => __awaiter(void 0, void 0, void 0, function* () {
        let err;
        try {
            yield (0, Notification_1.Notify)({
                type: 'fcm',
                message: {
                    token: getTestDeviceRegistrationToken()
                },
                credentials: getFcmCredentials()
            });
        }
        catch (e) {
            err = e.message;
        }
        return assert_1.default.equal(err, 'Message not defined.');
    }));
    it("Notification type not defined: Message should fail", () => __awaiter(void 0, void 0, void 0, function* () {
        let err;
        try {
            const params = {};
            yield (0, Notification_1.Notify)(params);
        }
        catch (e) {
            err = e.message;
        }
        return assert_1.default.equal(err, "Notification type not defined.");
    }));
    it("Unknown notification type passed: Message should fail", () => __awaiter(void 0, void 0, void 0, function* () {
        let err;
        try {
            const params = {
                type: "unknown"
            };
            yield (0, Notification_1.Notify)(params);
        }
        catch (e) {
            err = e.message;
        }
        return assert_1.default.equal(err, "Notification type not supported.");
    }));
    it("Registration token error should occur: Message should fail", () => __awaiter(void 0, void 0, void 0, function* () {
        let err;
        try {
            const params = {
                type: 'fcm',
                message: {
                    notification: {
                        title: "Hello world!",
                        body: "This is a test message"
                    },
                    token: 'NOT_VALID'
                },
                credentials: getFcmCredentials()
            };
            yield (0, Notification_1.Notify)(params);
        }
        catch (e) {
            err = e.message;
        }
        return assert_1.default.equal(err, 'The registration token is not a valid FCM registration token');
    }));
});
