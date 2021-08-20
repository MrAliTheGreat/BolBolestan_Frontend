export function convertNumToFarsi(text) {
    const arabicNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(text).split('').map(c => parseInt(c) ? arabicNumbers[parseInt(c)] : c === '0' ? '۰' : c).join('');
}

function farsiToEnglish(num){
    switch (num) {
        case '۰':
            return '0';
        case '۱':
            return '1';
        case '۲':
            return '2';
        case '۳':
            return '3';
        case '۴':
            return '4';
        case '۵':
            return '5';
        case '۶':
            return '6';
        case '۷':
            return '7';
        case '۸':
            return '8';
        case '۹':
            return '9';
        default:
            return '0';
    }
}

export function convertNumToEnglish(text){
    let englishNumber = "";
    for(let i = 0 ; i < text.length ; i++){
        englishNumber += farsiToEnglish(text[i]);
    }
    return englishNumber;
}