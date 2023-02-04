
export const toPersianDate = (yyyyear, month, day) => {  //Convert Gregorian Date to Solar Date

    let dayOfMonth = [
        0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ]
    let gk = 0;
    if(yyyyear % 4 === 0) {
        gk = 1;
        dayOfMonth[2] = 29;
    }
    let nOfDaysG = 0;
    for (let i = 1; i < month; i++) {
        nOfDaysG += dayOfMonth[i];
    }
    nOfDaysG += day;

    let nOfDaysS = 286;
    if((yyyyear - 1) % 4 === 0) {
        nOfDaysS = 287;
    }
    nOfDaysS += nOfDaysG;

    let sk = 0;
    if((yyyyear - 1) % 4 === 0) {
        if((month >= 4) || ((month === 3) && (day > 20))) {
            sk = 1;
        }
    }

    let ys = yyyyear - 622;
    if(sk === 1 ) {
        if(nOfDaysS > 366) {
            nOfDaysS -= 366;
            ys += 1;
        }
    }
    else {
        if(nOfDaysS > 365) {
            nOfDaysS -= 365;
            ys += 1;
        }
    }

    let ms = 0;
    let ds = 0;
    if(nOfDaysS <= 186) {
        ms = Math.floor((nOfDaysS - 1) / 31) + 1;
        ds = nOfDaysS - ((ms - 1) * 31);
    }
    else {
        let ms0 = Math.floor((nOfDaysS - 186 - 1) / 30) + 1;
        ms = ms0 + 6;
        ds = (nOfDaysS - 186) - ((ms0 - 1) * 30);
    }

    return `${ys.toString().padStart(4, "0")}/${ms.toString().padStart(2, "0")}/${ds.toString().padStart(2, "0")}`;
}

export const toPersianDateStr = (strDate) => {
    let str = strDate.replace("-", "/");
    if(str.length < 10) {
        return '';
    }
    let arr = str.split("/");
    if(arr[0].length < 4) {
        return '';
    }
    return toPersianDate(Number(arr[0]), Number(arr[1]), Number(arr[2]));
}

export const toPersianDateDate = (inDate) => {
    const y = inDate.getFullYear();
    const m = inDate.getMonth() + 1;
    const d = inDate.getDate();
    return toPersianDate(y, m, d);
}

export const fromPersianDate = (yyyyear, month, day) => {   //Convert Solar Date to Gregorian Date
    let dayOfMonth = [
        0, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29
    ]
    let sk = 0;
    if((yyyyear + 1) % 4 === 0) {
        sk = 1;
        dayOfMonth[12] = 30;
    }

    let nOfDaysS = 0;
    for (let i = 1; i < month; i++) {
        nOfDaysS += dayOfMonth[i]
        
    }
    nOfDaysS += day;

    let nOfDaysG = 79;
    /*if((yyyyear + 2) % 4 === 0) {
        nOfDaysG = 80
    }
    nOfDaysG += nOfDaysS;*/

    let gk = 0
    //let nOfDaysG = 79;
    if((yyyyear + 2) % 4 === 0) {
        if((month >= 11) || ((month === 10) && (day > 10))) {
            gk = 1
            //nOfDaysG = 80
        }
    }
    else if((yyyyear + 1) % 4 === 0) {
        if((month <= 9) || ((month === 10) && (day < 11))) {
            gk = 1
            //nOfDaysG = 80
        }
    }
    nOfDaysG += gk + nOfDaysS;

    let yg = yyyyear + 621;
    if(gk === 1) {
        if(nOfDaysG > 366) {
            nOfDaysG -= 366;
            yg += 1;
        }
    }
    else {
        if(nOfDaysG > 365) {
            nOfDaysG -= 365;
            yg += 1;
        }
    }
    let dayOfMonth2 = [
        0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ]
    let mg = 0;
    let dg = 0;
    if(nOfDaysG <= dayOfMonth2[1]) {
        mg = 1;
        dg = nOfDaysG;
    }
    else if(nOfDaysG <= (sumArray(dayOfMonth2, 1, 2) + gk)) {
        mg = 2
        dg = nOfDaysG - sumArray(dayOfMonth2, 1, 1)
    }
    else if(nOfDaysG <= (sumArray(dayOfMonth2, 1, 3) + gk)) {
        mg = 3
        dg = nOfDaysG - (sumArray(dayOfMonth2, 1, 2) + gk)
    }
    else if(nOfDaysG <= (sumArray(dayOfMonth2, 1, 4) + gk)) {
        mg = 4
        dg = nOfDaysG - (sumArray(dayOfMonth2, 1, 3) + gk)
    }
    else if(nOfDaysG <= (sumArray(dayOfMonth2, 1, 5) + gk)) {
        mg = 5
        dg = nOfDaysG - (sumArray(dayOfMonth2, 1, 4) + gk)
    }
    else if(nOfDaysG <= (sumArray(dayOfMonth2, 1, 6) + gk)) {
        mg = 6
        dg = nOfDaysG - (sumArray(dayOfMonth2, 1, 5) + gk)
    }
    else if(nOfDaysG <= (sumArray(dayOfMonth2, 1, 7) + gk)) {
        mg = 7
        dg = nOfDaysG - (sumArray(dayOfMonth2, 1, 6) + gk)
    }
    else if(nOfDaysG <= (sumArray(dayOfMonth2, 1, 8) + gk)) {
        mg = 8
        dg = nOfDaysG - (sumArray(dayOfMonth2, 1, 7) + gk)
    }
    else if(nOfDaysG <= (sumArray(dayOfMonth2, 1, 9) + gk)) {
        mg = 9
        dg = nOfDaysG - (sumArray(dayOfMonth2, 1, 8) + gk)
    }
    else if(nOfDaysG <= (sumArray(dayOfMonth2, 1, 10) + gk)) {
        mg = 10
        dg = nOfDaysG - (sumArray(dayOfMonth2, 1, 9) + gk)
    }
    else if(nOfDaysG <= (sumArray(dayOfMonth2, 1, 11) + gk)) {
        mg = 11
        dg = nOfDaysG - (sumArray(dayOfMonth2, 1, 10) + gk)
    }
    else if(nOfDaysG <= (sumArray(dayOfMonth2, 1, 12) + gk)) {
        mg = 12
        dg = nOfDaysG - (sumArray(dayOfMonth2, 1, 11) + gk)
    }

    return `${yg.toString().padStart(4, "0")}-${mg.toString().padStart(2, "0")}-${dg.toString().padStart(2, "0")}`;

}

const sumArray = (array, startI, endI) => {
    let sum = 0;
    for (let i = startI; i <= endI; i++) {
        sum += array[i];
    }
    return sum;
}

export const fromPersianDateStr = (strDate) => {
    let str = strDate.replace("-", "/");
    if(str.length < 10) {
        return '';
    }
    let arr = str.split("/");
    if(arr[0].length < 4) {
        return '';
    }
    return fromPersianDate(Number(arr[0]), Number(arr[1]), Number(arr[2]));
}
