import { notification } from 'antd';

type NotificationType = "success" | "info" | "warning" | "error";

export const showNotification = (type: NotificationType, message: String) => {
    notification[type]({ message });
};