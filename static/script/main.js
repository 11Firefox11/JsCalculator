window.current = ["0"];
window.maxnumlength = 12;

window.toptext = document.querySelector("#curr");
window.fontsizecurr = window.toptext.style.fontSize;

window.main = document.querySelector("main");
window.defmainsize = [window.main.clientWidth, window.main.clientHeight];

function Run(code) {
    if (code < 10) {
        InsertNumber(code);
    } else if (code == 11) {
        DeleteCurrent();
    } else if (code == 12) {
        DeleteFromCurrNum();
    } else if (code == 19) {
        AddFloat();
    }
    DisplayNumber();
}

function InsertNumber(num) {
    numi = GetTheLastNumberIndex();
    if (window.current[numi] == "0") {
        window.current[numi] = String(num);
    } else if (window.current[numi].length < window.maxnumlength+1) {
        window.current[numi] = window.current[0].concat(num);
    } else {
        ErrorTop();
    }
}

function DisplayNumber() {
    currnum = window.current[GetTheLastNumberIndex()];
    if (window.toptext.value != currnum) {
        window.toptext.value = MakeNumberReadable(window.current[GetTheLastNumberIndex()]);
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
    start = num[0].slice(0, num[0].length % 3);
    var out = [];
    if (start.length != 0) {
        out.push(start);
    } 
    for (i=num[0].length % 3; i < num[0].length; i+=3) {
        out.push(num[0].substr(i, 3));
    }
    jchar = "";
    plus = "";
    if (out.length != 1) {
        jchar = "."
    }
    if (num[1]) {
        if (num[1] != ",") {
            plus = `,${num[1]}`;
        } else {
            plus = ",";
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
    lasti = GetTheLastNumberIndex()
    currnum = window.current[lasti];
    if (!currnum.includes(",")) {
        window.current[lasti] = currnum.concat(",");
    } else {
        ErrorTop();
    }
}

function DeleteFromCurrNum() {
    currnum = window.current[GetTheLastNumberIndex()];
    if (currnum == "0") {
        ErrorTop();
    } else if (currnum.length == 1) {
        window.current[GetTheLastNumberIndex()] = "0";
    } else {
        window.current[GetTheLastNumberIndex()] = currnum.slice(0, -1);
    }
}

function DeleteCurrent() {
    if (window.current != "0") {
        window.current = ["0"];
    } else {
        ErrorTop();
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

function SetSizesToTop(sizestoset) {
    if (sizestoset == "def") {
        window.toptext.style.fontSize = window.fontsizecurr;
    } else {
        window.toptext.style.fontSize = Number(window.fontsizecurr.slice(0, -3)) + sizestoset + "rem";
    }
}

function CheckResize() {
    sizes = [window.main.clientWidth, window.main.clientHeight];
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
new ResizeObserver(CheckResize).observe(window.main);