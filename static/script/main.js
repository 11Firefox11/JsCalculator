window.current = ["0"];
window.previouscurr = false;
window.maxnumlength = 12;
window.nextdissapear = false;

window.codedict = {11:"DeleteCurrent", 12:"DeleteFromCurrNum", 15:"ToggleNumberMinus", 16:"AddFloat", 14:"Calculate", 13.1:"CountOnePercent"};

window.toptext = document.querySelector("#curr");
window.fontsizecurr = window.toptext.style.fontSize;

window.main = document.querySelector("main");
window.defmainsize = [window.main.clientWidth, window.main.clientHeight];
window.commandsdict = {"109&shift|189&shift":15, "106|189&alt":13.3, "188|108|190":16, "46|8&shift":11 ,"+8":12, "53&shift":13.1, "111|54&shift":13.2, "13|Enter":14, "109|189":13.4, "107|51&shift":13.5};
for (i=0;i<10;i++) {
    window.commandsdict[`${96+i}|${48+i}`] = i;
}

function Run(code) {
    if ((code < 12 || code == 16) && window.nextdissapear == true) {
        window.current = ["0"];
    }
    if (code < 10) {
        InsertNumber(code);
    } else if (code in window.codedict) {
        eval(`${window.codedict[code]}()`);
    } else if (code < 14) {
        AddAction(code);
    }
    DisplayNumber();
    if ((code < 12 || code == 15 || code == 16) && window.nextdissapear == true) {
        window.nextdissapear = false;
    }
}

function Calculate() {
    if (window.current.length != 3 && window.previouscurr == false) {
        return
    }
    if (window.previouscurr && window.current.length == 1) {
        num = window.current[0];
        window.current = window.previouscurr;
        window.current[0] = num;
    }
    actions = {"/":"divide", "*":"multiply", "-":"subtract", "+":"add"};
    twonums = [window.current[0].replace(",", "."), window.current[2].replace(",", ".")];
    for (x=0; x < twonums.length; x++) {
        if (String(twonums[x]).includes("e")) {
            twonums[x] = ConvertEtypeNum(twonums[x]);
        }
    }
    window.previouscurr = window.current;
    num = BignumToStr(eval(`new BigNumber('${twonums[0]}').${actions[window.current[1]]}('${twonums[1]}')`));
    if (!num) {
        ErrorTop();
        DeleteCurrent();
    } else {
        window.current = [num.replace(".", ",")];
        window.nextdissapear = true;
    }
}

function AddAction(code) {
    action = {"2":"/", "3":"*", "4":"-", "5":"+"};
    caction = (action[String(code)[String(code).length-1]])
    if (window.current.length == 3) {
        window.current[1] = caction;
    } else {
        window.current.push(caction);
        window.current.push("0");
    }
    window.nextdissapear = false;
}

function CountOnePercent() {
    currnum = window.current[GetTheLastNumberIndex()];
    if (currnum != 0) {
        if (String(currnum).includes("e")) {
            currnum = ConvertEtypeNum(currnum);
        }
        num = BignumToStr(new BigNumber(currnum.replace(",", ".")).multiply(0.01)).replace(".", ",")
        if (num[num.length-1] == ",") {
            num = num.slice(0,num.length-1);
        }
        window.current = [num];
    }
}

function InsertNumber(num) {
    numi = GetTheLastNumberIndex();
    if (window.current[numi] == "0") {
        window.current[numi] = String(num);
    } else if (window.current[numi].length < window.maxnumlength+1) {
        window.current[numi] = window.current[numi].concat(num);
    } else {
        ErrorTop();
    }
}

function DisplayNumber() {
    currnum = window.current[GetTheLastNumberIndex()];
    if (window.toptext.value != currnum) {
        num = window.current[GetTheLastNumberIndex()]
        if (String(Number(num)).includes("e")) {
            num = String(Number(num)).split("e");
            num[0] = MakeNumberReadable(num[0].replace(".", ","));
            window.toptext.value = num.join("e");
        } else if (String(Number(num)) == "Infinity") {
            window.toptext.value = "Infinity";
            DeleteCurrent();
        } else {
            window.toptext.value = MakeNumberReadable(num);
        }
    }
    CheckDisplayOverflow();
}

function CheckDisplayOverflow() {
    if (!window.toptext.classList.contains("oneline")) {
        ToggleOneline();
    }
    if (window.toptext.clientHeight < window.toptext.scrollHeight || window.toptext.clientWidth < window.toptext.scrollWidth) {
        ToggleOneline();
    }
}

function MakeNumberReadable(num) {
    numcp = num;
    num = String(num).split(",");
    if (!num[1] && String(numcp).includes(",")) {
        num[1] = ",";
    }
    if (num[0][0] == "-") {
        num[0] = num[0].substr(1);
    }
    start = num[0].slice(0, num[0].length % 3);
    var out = [];
    if (start.length != 0) {
        out.push(start);
    } 
    for (i=num[0].length % 3; i < num[0].length; i+=3) {
        out.push(num[0].substr(i, 3));
    }
    jchar = "";plus = "";
    if (out.length != 1) {
        jchar = "."
    }
    if (numcp[0] == "-" && numcp != "-0") {
        out[0] = "-" + out[0];
    }
    if (num[1]) {
        plus = ",";
        if (num[1] != ",") {
            plus += num[1];
        }
    }
    return `${out.join(jchar)}${plus}`;
}

function GetTheLastNumberIndex() {
    if (window.current.length == 3) {
        return 2;
    } else {
        return 0;
    }
}

function AddFloat() {
    lasti = GetTheLastNumberIndex();
    currnum = window.current[lasti];
    num = currnum;
    if (num[0] == "-") {
        num = num.slice(1);
    }
    if (num.length >= window.maxnumlength) {
        ErrorTop();
    } else if (!currnum.includes(",")) {
        window.current[lasti] = currnum.concat(",");
    } else {
        if (!window.nextdissapear) {
            ErrorTop();
        }
    }
}

function ToggleNumberMinus() {
    currnum = window.current[GetTheLastNumberIndex()];
    if (Number(currnum) != 0) {
        if (currnum[0] == "-") {
            toset = currnum.substring(1);
        } else {
            toset = "-" + currnum;
        }
        window.current[GetTheLastNumberIndex()] = toset;
    } else {
        ErrorTop();
    }
}

function BignumToStr(bignum) {
    if (bignum["_d"].join("").length != bignum["_f"]) {
        bignum["_d"].splice(bignum["_f"], 0, ".");
    }
    if (bignum["_s"]) {
        return `-${bignum["_d"].join("")}`;
    }
    num = bignum["_d"].join("");
    if (num.includes(".")) {
        num = parseFloat(num);
        return String(num).replace(".", ",");
    }
    return num;
}

function DeleteFromCurrNum() {
    currnum = window.current[GetTheLastNumberIndex()];
    if (currnum == "0") {
        return;
    } else if (currnum.length == 1 || currnum.length == 2 && currnum[0] == "-") {
        window.current[GetTheLastNumberIndex()] = "0";
    } else {
        window.current[GetTheLastNumberIndex()] = currnum.slice(0, -1);
    }
}

function DeleteCurrent() {
    if (window.current != "0") {
        window.current = ["0"];
    }
    window.previouscurr = false;
}

function ConvertEtypeNum(num) {
    num = String(num).split("e");
    if (num[1].includes("-")) {
        return "0." + "0".repeat(Number(num[1].slice(1))-1) + String(num[0]).replace(".", "");
    } else {
        return String(num[0]).replace(".", "") + "0".repeat(Number(num[1].slice(1))-num[0].length+2);
    }
}

function ScanIfPhone() {
    ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) && (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua))) {
        window.main.classList.add("phone");
    }
};

function ErrorTop() {
    var top = document.getElementById("top");
    top.classList.remove("error");
    setTimeout(function(){ top.classList.add("error"); }, 3);
}

function ToggleOneline() {
    window.toptext.classList.toggle("oneline");
}

function KeyPress(e) {
    var eobj = window.event? event : e
    for (key in window.commandsdict) {
        code = window.commandsdict[key];
        key = key.split("|");
        was = false;
        for (k=0;k < key.length;k++) {
            if (key[k].includes("&")) {
                key[k] = key[k].split("&");
                if (eobj.keyCode == key[k][0] && eval(`eobj.${key[k][1]}Key`)) {
                    was = true;
                    break;
                }
            } else if (eobj.keyCode == key[k]) {
                was = true;
                break;
            }
        }
        if (was) {
            Run(code);
            break;
        }
    }
}

function SetSizesToTop(sizestoset) {
    if (sizestoset == "def") {
        window.toptext.style.fontSize = window.fontsizecurr;
    } else {
        window.toptext.style.fontSize = Number(window.fontsizecurr.slice(0, -3)) + sizestoset + "rem";
    }
}

function CheckResize() {
    sizes = [window.main.clientWidth, window.main.clientHeight];
    tofull = [document.body.clientWidth, document.body.clientHeight];
    sides = ["width", "height"];
    for (i in sides) {
        if (sizes[i] == tofull[i]) {
            if (`window.main.style.${sides[i]}` != "100%") {
                eval(`window.main.style.${sides[i]} = "100%";`);
            }
        }
    }
    toset = 0.004;
    if (sizes[1] == window.defmainsize[1]) {
        toset = "def";
    } else {
        toset = toset * (sizes[1] - window.defmainsize[1]);
    }
    SetSizesToTop(toset);
    CheckDisplayOverflow();
}

document.onload = ScanIfPhone();DisplayNumber();
document.onkeydown = KeyPress;
new ResizeObserver(CheckResize).observe(window.main);