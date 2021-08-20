export function hasNumberInString(text) {
    return /\d/.test(text);
}

export function isNumeric(num){
    return !isNaN(num);
}

export function isDateValid(date){
    const dateInfo = date.split("/");
    if(dateInfo.length <= 2){
        return false;
    }

    if(dateInfo[0].length < 4 || dateInfo[1].length < 2 || dateInfo[2].length < 2){
        return false;
    }

    if(parseInt(dateInfo[1]) <= 0 || parseInt(dateInfo[1]) > 12 || parseInt(dateInfo[2]) <= 0 || parseInt(dateInfo[2]) > 31){
        return false;
    }

    return true;
}

export function hasDomain(email){
    return email.includes('@');
}