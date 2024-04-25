import Mongoose, { Types } from "mongoose";
export interface INotificationHistory {
    notificationIdempotentKey: Types.ObjectId;
    createdAt: string;
}
export declare const NotificationHistory: Mongoose.Model<INotificationHistory, {}, {}, {}, any>;
//# sourceMappingURL=NotificationHistory.d.ts.map