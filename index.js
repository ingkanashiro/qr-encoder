// QR ENCODER

let type = '0100', level = 'L'; // level is always set to LOW for maximum length.
let str = document.getElementById('input').value;

const maxLength = [
    17,
    32,
    53,
    78,
    106,
    134,
    154,
    192,
    230,
    271,
    321,
    367,
    425,
    458,
    520,
    586,
    644,
    718,
    792,
    858,
    929,
    1003,
    1091,
    1171,
    1273,
    1367,
    1465,
    1528,
    1628,
    1732,
    1840,
    1952,
    2068,
    2188,
    2303,
    2431,
    2563,
    2699,
    2809,
    2953
]

let encodingError = false;


function encodeQR() {
    let str = document.getElementById('input').value;
    console.log(str);

    let version = -1;
    let size = 21

    for (let i = 0; i < 41; i++) {
        if (str.length < maxLength[i]) {

            size = 21 + (4 * i);
            version = ++i;

            break;
        }
    }

    console.log(size);

    if (version < 1) {
        encodingError = true;
    }
    else {
        encodingError = false;
    }

    if (encodingError) {
        document.getElementById('qrcode').classList.add('disable');
        document.getElementById('error-msg').classList.remove('disable');

        document.documentElement.style.setProperty('--canvas-bg-color', 'hsl(353, 100%, 71%)');

        console.log('Error encountered while encoding QR');
    }
    else {
        document.getElementById('qrcode').classList.remove('disable');
        document.getElementById('error-msg').classList.add('disable');

        document.documentElement.style.setProperty('--canvas-bg-color', 'hsl(0, 0%, 11%)');
    }

    let charCount = toBinary(str.length, version);
    let bitString = encodeLine(str);

    // Complete capacity with filler bytes (11101100 00010001)

    let fillerStr = '';

    console.log(version);

    let fillerLength = (maxLength[version - 1] * 8) - bitString.replaceAll(' ', '').length;
    console.log(fillerLength);

    for (let i = 0; i < fillerLength; i++) {

        if ([0, 1, 2, 4, 5, 11, 15].includes(i % 16)) {
            fillerStr += '1';
        }
        else {
            fillerStr += '0';
        }

        if (i % 8 === 7) {
            fillerStr += ' ';
        }

    }

    console.log(type + ' ' + charCount + ' ' + bitString + ' ' + fillerStr);
}

function encodeLine(arg) {
    let ln = '';

    for (let i = 0; i < arg.length; i++) {
        ln += toBinary(arg.charCodeAt(i), 0) + ' ';
    }

    ln += '0000'; // padding zeros

    return ln;
}

function toBinary(num, p) {
    let len;
    if (p < 10) {
        len = 8;
    }
    else {
        len = 16;
    }

    let binary = '';
    while (num > 0) {
        binary = (num % 2) + binary;
        num = Math.floor(num / 2);
    }

    while (binary.length < len) {
        binary = '0' + binary;
    }

    return binary;
}




