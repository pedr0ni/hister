import { Platform } from "react-native"
import { MessageType, showMessage } from 'react-native-flash-message'
import Snackbar from 'react-native-snackbar'

export default {
    show: (title: string, message: string, duration: number, type: MessageType) => {
        if (Platform.OS == 'android') {
            Snackbar.show({
                text: `${title} ${message}`,
                duration
            })
        } else {
            showMessage({
                message: title,
                description: message,
                duration,
                type
            })
        }
    }
}