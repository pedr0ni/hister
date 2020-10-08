import { Platform } from "react-native"
import { showMessage } from 'react-native-flash-message'
import Snackbar from 'react-native-snackbar'

export default {
    show: (title, message, duration, type) => {
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