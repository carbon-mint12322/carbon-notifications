import assert from "assert";
import { ServiceAccount } from "firebase-admin";
import { Notify } from "../lib/Notification"

function getTestDeviceRegistrationToken() {
    
    const token = process.env.TEST_DEVICE_REGISTRATION_TOKEN || null;

    if (!(token && token.length)) throw new Error("Test device token not defined in env.");

    return token;
}

function getFcmCredentials() {
    return JSON.parse(process.env.GOOGLE_SERVICES_JSON_CREDENTIALS || "{}") as Required<ServiceAccount>
}

describe("FCM message flow testing", () => {

    it("Message should be sent", async () => {

        const res = await Notify({
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

        return assert.equal((typeof res === "string" && res.length > 0), true)
    })

    it("No message passed: Message should fail", async () => {

        let err;
        try {
             await Notify({
                type: 'fcm',
                message: {
                    token: getTestDeviceRegistrationToken()
                 },
                 credentials: getFcmCredentials()
            });
        } catch (e) {
            err = (e as Error).message
        }

        return assert.equal(err, 'Message not defined.')
    })

    it("Notification type not defined: Message should fail", async () => {

        let err;
        try {

            const params = {} as any

             await Notify(params);
        } catch (e) {
            err = (e as Error).message
        }

        return assert.equal(err, "Notification type not defined.")
    });

    it("Unknown notification type passed: Message should fail", async () => {

        let err;
        try {

            const params = {
                type : "unknown"
            } as any

             await Notify(params);
        } catch (e) {
            err = (e as Error).message
        }

        return assert.equal(err, "Notification type not supported.")
    });


    it("Registration token error should occur: Message should fail", async () => {

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
            } as any

             await Notify(params);
        } catch (e) {
            err = (e as Error).message
        }
        

        return assert.equal(err, 'The registration token is not a valid FCM registration token')
    });

})