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
const errorCorrectionLookupTable = [ // EC per block / Blocks (1) / Codewords per block (1) / ...(2)
    [7, 1, 19, 0, 0],
    [10, 1, 34, 0, 0],
    [15, 1, 55, 0, 0],
    [20, 1, 80, 0, 0],
    [26, 1, 108, 0, 0],
    [18, 2, 68, 0, 0],
    [20, 2, 78, 0, 0],
    [24, 2, 97, 0, 0],
    [30, 2, 116, 0, 0],
    [18, 2, 68, 2, 69],
    [20, 4, 81, 0, 0],
    [24, 2, 92, 2, 93],
    [26, 4, 107, 0, 0],
    [30, 3, 115, 1, 116],
    [22, 5, 87, 1, 88],
    [24, 5, 98, 1, 99],
    [28, 1, 107, 5, 108],
    [30, 5, 120, 1, 121],
    [28, 3, 113, 4, 114],
    [28, 3, 107, 5, 108],
    [28, 4, 116, 4, 117],
    [28, 2, 111, 7, 112],
    [30, 4, 121, 5, 122],
    [30, 6, 117, 4, 118],
    [26, 8, 106, 4, 107],
    [28, 10, 114, 2, 115],
    [30, 8, 122, 4, 123],
    [30, 3, 117, 10, 118],
    [30, 7, 116, 7, 117],
    [30, 5, 115, 10, 116],
    [30, 13, 115, 3, 116],
    [30, 17, 115, 0, 0],
    [30, 17, 115, 1, 116],
    [30, 13, 115, 6, 116],
    [30, 12, 121, 7, 122],
    [30, 6, 121, 14, 122],
    [30, 17, 122, 4, 123],
    [30, 4, 122, 18, 123],
    [30, 20, 177, 4, 188],
    [30, 19, 118, 6, 119]
]

let encodingError = false;

const alpha = [
    1,
    2,
    4,
    8,
    16,
    32,
    64,
    128,
    29,
    58,
    116,
    232,
    205,
    135,
    19,
    38,
    76,
    152,
    45,
    90,
    180,
    117,
    234,
    201,
    143,
    3,
    6,
    12,
    24,
    48,
    96,
    192,
    157,
    39,
    78,
    156,
    37,
    74,
    148,
    53,
    106,
    212,
    181,
    119,
    238,
    193,
    159,
    35,
    70,
    140,
    5,
    10,
    20,
    40,
    80,
    160,
    93,
    186,
    105,
    210,
    185,
    111,
    222,
    161,
    95,
    190,
    97,
    194,
    153,
    47,
    94,
    188,
    101,
    202,
    137,
    15,
    30,
    60,
    120,
    240,
    253,
    231,
    211,
    187,
    107,
    214,
    177,
    127,
    254,
    225,
    223,
    163,
    91,
    182,
    113,
    226,
    217,
    175,
    67,
    134,
    17,
    34,
    68,
    136,
    13,
    26,
    52,
    104,
    208,
    189,
    103,
    206,
    129,
    31,
    62,
    124,
    248,
    237,
    199,
    147,
    59,
    118,
    236,
    197,
    151,
    51,
    102,
    204,
    133,
    23,
    46,
    92,
    184,
    109,
    218,
    169,
    79,
    158,
    33,
    66,
    132,
    21,
    42,
    84,
    168,
    77,
    154,
    41,
    82,
    164,
    85,
    170,
    73,
    146,
    57,
    114,
    228,
    213,
    183,
    115,
    230,
    209,
    191,
    99,
    198,
    145,
    63,
    126,
    252,
    229,
    215,
    179,
    123,
    246,
    241,
    255,
    227,
    219,
    171,
    75,
    150,
    49,
    98,
    196,
    149,
    55,
    110,
    220,
    165,
    87,
    174,
    65,
    130,
    25,
    50,
    100,
    200,
    141,
    7,
    14,
    28,
    56,
    112,
    224,
    221,
    167,
    83,
    166,
    81,
    162,
    89,
    178,
    121,
    242,
    249,
    239,
    195,
    155,
    43,
    86,
    172,
    69,
    138,
    9,
    18,
    36,
    72,
    144,
    61,
    122,
    244,
    245,
    247,
    243,
    251,
    235,
    203,
    139,
    11,
    22,
    44,
    88,
    176,
    125,
    250,
    233,
    207,
    131,
    27,
    54,
    108,
    216,
    173,
    71,
    142,
    1
];

function encodeQR() {
    let str = document.getElementById('input').value;

    // TESTING PURPOSES ONLY
    str = 'never gonna give you up, never gonna let you down, never gonna run around and desert you. we\'re no' +
        ' strangers to love; you know the rules, and so do i.'

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

    const parameters = errorCorrectionLookupTable[version - 1];
    let totalLength = (parameters[1] * parameters[2]) + (parameters[3] * parameters[4]);

    let fillerLength = (totalLength * 8) - (type + charCount + bitString).replaceAll(' ', '').length;
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

    let bigStr = (type + charCount + bitString + fillerStr).replaceAll(' ', '');

    let group1 = [];
    let group2 = [];

    console.log(bigStr.length);

    let dataArray = byteStringToArray(bigStr);
    console.log(dataArray);

    // We need the number of blocks and codewords for each group.

    let blocks1 = parameters[1], // number of blocks in group 1
        codewords1 = parameters[2], // number of codewords per block in group 1
        blocks2 = parameters[3],
        codewords2 = parameters[4]; // ... group 2

    while (blocks1--) {
        group1.push([]);
    }

    while (blocks2--) {
        group2.push([]);
    }

    // Reset values
    blocks1 = parameters[1]; // number of blocks in group 1
    codewords1 = parameters[2]; // number of codewords per block in group 1
    blocks2 = parameters[3];
    codewords2 = parameters[4]; // ... group 2

    // Now we have a pair of arrays for group 1 and group 2 as follows:
    // Group 1: [['', '', '', ...], ['', '', '', ...], ...]
    // Group 2: ...

    let codeword = 0;
    let blocks = [];

    // Divide data into groups and blocks

    for (let b = 0; b < blocks1; b++) {
        for (let c = 0; c < codewords1; c++) {

            group1[b].push(dataArray[codeword]);
            codeword++;

        }

        console.log(group1[b]);
        blocks.push(group1[b]);
    }


    for (let b = 0; b < blocks2; b++) {
        for (let c = 0; c < codewords2; c++) {

            group2[b].push(dataArray[codeword]);
            codeword++;

        }

        blocks.push(group2[b]);
    }

    let genPolynomial = [];
    const errorCorrections = parameters[0];

    switch (errorCorrections) {
        case 7:
            genPolynomial = [0, 87, 229, 146, 149, 238, 102, 21];
            break;

        case 10:
            genPolynomial = [0, 251, 67, 46, 61, 118, 70, 64, 94, 32, 45];
            break;

        case 15:
            genPolynomial = [0, 8, 183, 61, 91, 202, 37, 51, 58, 58, 237, 140, 124, 5, 99, 105];
            break;

        case 18:
            genPolynomial = [0, 215, 234, 158, 94, 184, 97, 118, 170, 79, 187, 152, 148, 252, 179,
                             5, 98, 96, 153];
            break;

        case 20:
            genPolynomial = [0, 17, 60, 79, 50, 61, 163, 26, 187, 202, 180, 221, 225, 83, 239, 156,
                             164, 212, 212, 188, 190];
            break;

        case 22:
            genPolynomial = [0, 210, 171, 247, 242, 93, 230, 14, 109, 221, 53, 200, 74, 8, 172, 98,
                             80, 219, 134, 160, 105, 165, 231];
            break;

        case 24:
            genPolynomial = [0, 229, 121, 135, 48, 211, 117, 251, 126, 159, 180, 169, 152, 192, 226,
                             228, 218, 111, 0, 117, 232, 87, 96, 227, 21];
            break;

        case 26:
            genPolynomial = [0, 173, 125, 158, 2, 103, 182, 118, 17, 145, 201, 111, 28, 165, 53, 161,
                             21, 245, 142, 13, 102, 48, 227, 153, 145, 218, 70];
            break;

        case 28:
            genPolynomial = [0, 168, 223, 200, 104, 224, 234, 108, 180, 110, 190, 195, 147, 205, 27,
                             232, 201, 21, 43, 245, 87, 42, 195, 212, 119, 242, 37, 9, 123];
            break;

        case 30:
            genPolynomial = [0, 41, 173, 145, 152, 216, 31, 179, 182, 50, 48, 110, 86, 239, 96, 222,
                             125, 42, 173, 226, 193, 224, 130, 156, 37, 251, 216, 238, 40, 192, 180];
            break;
    }

    for (let i = 0; i < genPolynomial.length; i++) {
        let k = genPolynomial[i];
        genPolynomial[i] = alpha[k];
    }

    console.log('*******************************')
    console.log(group1); // data
    console.log(group2);
    console.log(blocks);


    console.log(genPolynomial);

    // We're now ready to encode the error correction string!
    // Order: Group 1: [ blocks... ], Group 2: [ blocks... ]

    let dataCodewords = type + ' ' + charCount + ' ' + bitString + ' ' + fillerStr;

    let errorCorrectionBlocks = [];

    for (let b = 0; b < group1.length; b++) {

        let msg = [];
        for (let s = 0; s < group1[b].length; s++) {
            msg.push((group1[b])[s]);
        }

        errorCorrectionBlocks.push(generateErrorCorrection(msg, genPolynomial, errorCorrections));
    }

    for (let b = 0; b < group2.length; b++) {

        let msg = [];
        for (let s = 0; s < group1[b].length; s++) {
            msg.push((group1[b])[s]);
        }

        errorCorrectionBlocks.push(generateErrorCorrection(msg, genPolynomial, errorCorrections));
    }

    let interleavedData = '',
        interleavedErrorCorrection = '';

    for (let c = 0; c < Math.max(parameters[2], parameters[4]); c++) {
        for (let b = 0; b < blocks.length; b++) {
            if ((blocks[b])[c] != undefined) {
                interleavedData += toBinary((blocks[b])[c], 0) + ' ';
            }
        }
    }

    for (let c = 0; c < errorCorrections; c++) {
        for (let b = 0; b < errorCorrectionBlocks.length; b++) {
            if ((errorCorrectionBlocks[b])[c] != undefined) {
                interleavedErrorCorrection += toBinary((errorCorrectionBlocks[b])[c], 0) + ' ';
            }
        }
    }

    console.log(interleavedData + interleavedErrorCorrection);

    // We're almost done encoding! Now we check the QR version for required remainder bits (0)
    let remainderReq;
    let remainder = '';

    if ([1,7,8,9,10,11,12,13,35,36,37,38,39,40].includes(version)) {
        remainderReq = 0;
    }
    else if ([2,3,4,5,6].includes(version)) {
        remainderReq = 7;
    }
    else if ([14,15,16,17,18,19,20,28,29,30,31,32,33,34].includes(version)) {
        remainderReq = 3;
    }
    else {
        remainderReq = 4;
    }

    while (remainderReq--) {
        remainder += '0';
    }

    let encodedQR = interleavedData + interleavedErrorCorrection + remainder;
    console.log(encodedQR);

    encodedQR = encodedQR.replaceAll(' ', '');
}


function generateErrorCorrection(msgPolynomial, genPolynomial, errorCorrections) {
    let gen = genPolynomial, // this polynomial is static and does not change
        div = msgPolynomial; // this polynomial changes throughout the loops

    const loop = div.length;
    console.log(errorCorrections);

    // Now it's time to LOOP this thing.
    for (let l = 0; l < loop; l++) {

        // Multiply gen by the lead term of div -> res
        let term = alpha.indexOf(div[0]);
        let res = [];

        gen = toAlpha(gen);

        for (let k = 0; k < gen.length; k++) {
            res[k] = (gen[k] + term) % 255;
        }

        res = fromAlpha(res);
        gen = fromAlpha(gen);

        while (res.length < div.length) {
            res.push(0);
        }

        // XOR res with div -> div (new)
        let temp = div;

        for (let k = 0; k < div.length; k++) {
            temp[k] = xor(div[k], res[k]);
        }

        temp.push(0);

        for (let k = 0; k < div.length; k++) {
            div[k] = temp[k + 1];
        }
    }

    while (div[div.length - 1] === 0 || div[div.length - 1] === undefined) {
        div.pop();
    }

    console.log(div);
    return div;
}

function arrayToByteString(arr) {

    let str = '';

    for (let i = 0; i < arr.length; i++) {
        str += toBinary(arr[i], 0) + ' ';
    }

    return str;
}

function byteStringToArray(arg) {

    let arr = [];
    let str = '';

    for (let c = 0; c < arg.length; c++) {

        str += arg[c];

        if (c % 8 === 7) {
            arr.push(toBase10(str));
            str = '';
        }
    }

    return arr;
}

function toAlpha(p) {

    let result = p;
    for (let i = 0; i < p.length; i++) {
        result[i] = alpha.indexOf(p[i]);
    }

    return result;
}

function fromAlpha(p) {

    let result = p;
    for (let i = 0; i < p.length; i++) {
        result[i] = alpha[p[i]];
    }

    return result;

}

function xor(x, y) {

    let argx = toBinary(x, 0),
        argy = toBinary(y, 0);

    let result = '';

    for (let i = 0; i < 8; i++) {
        if (argx.charAt(i) === argy.charAt(i)) {
            result += '0';
        }
        else {
            result += '1';
        }
    }

    return toBase10(result);
}

function toBase10(arg) {

    let num = 0;

    for (let i = 7; i >= 0; i--) {
        num += Number(arg.charAt(i)) * Math.pow(2, i);
    }

    return num;
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




