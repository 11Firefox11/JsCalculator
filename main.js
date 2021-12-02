window.current = "321x4423";
window.cursor = 3;

function AddToCurrent(code) {
    if (code < 10) {
        window.current = window.current.concat(code);
    } else if (code == 10) {
        if (!isNaN(window.current[window.cursor-1])) {
            i = window.cursor - 2;
            while (i) {
                currcheck = window.current[i];
                if (currcheck === undefined) {
                    i = 0;
                    break
                } else if (isNaN(currcheck)) {
                    break
                }
                i -= 1
            }
            if (i == 0) {
                i = -1;
            }
            copy = window.current.split("");
            before = [window.current[i], window.current[i-1]];
            console.log(i);
            if (before[0] == "-" && before[1] == "(") {
                copy.splice(i-1, 2);
            } else {
                copy.splice(i+1, 0, "(-");
            }
            window.current = copy.join("");
        }
    }
}