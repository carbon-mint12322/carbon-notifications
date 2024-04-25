import axios from "axios";
import { TelegramBotNotificationT } from "../../../types";

export async function telegramHandler({
    token, chatId, text
}: TelegramBotNotificationT) {

    return axios.post(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`);
}