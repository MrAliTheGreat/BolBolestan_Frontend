export function convertDayToFarsi(text) {
    switch (text) {
        case "Saturday":
            return "شنبه";
        case "Sunday":
            return "یک شنبه";
        case "Monday":
            return "دوشنبه";
        case "Tuesday":
            return "سه شنبه";
        case "Wednesday":
            return "چهارشنبه";
        case "Thursday":
            return "پنج شنبه"
        case "Friday":
            return "جمعه"
        default:
            return text
    }
}