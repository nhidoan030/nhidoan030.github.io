//BT1 C1
function showTime() {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/" + (currentdate.getMonth()+1) + "/" + currentdate.getFullYear() + " "+ currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
// var datetimeElement = document.getElementById("result1");
// datetimeElement.innerHTML = datetime;
    console.log(datetime);
}

//BT2
function showDatetime() {
    var currentday = new Date();
    dd = currentday.getDate();
    mm = currentday.getMonth()+1;
    if (dd < 10) {dd = "0" + dd};
    if (mm < 10) {mm = "0" + mm};
    var datetime1 = dd + "/" + mm + "/" + currentday.getFullYear();
        timedate2 = dd + "-" + mm + "-" + currentday.getFullYear();
        dateTime3 = mm + "-" + dd + "-" + currentday.getFullYear();
        timeDate4 = mm + "/" + dd + "/" + currentday.getFullYear();
//      outPutdate = datetime1 + "     " + timedate2 + "     "+ dateTime3 + "    " + timeDate4;
//  document.getElementById("result2").innerHTML = outPutdate;
    console.log(datetime1);
    console.log(dateTime3);
    console.log(timeDate4);
    console.log(timedate2);
}


//BT3
function isIncrease(numbers) {
    for (var num = 0; num < numbers.length - 1; num++) {
        if (!(numbers[num] < numbers[num + 1])) {
        return false;
        }
    }
    return true;
}

//BT4
function changeLetter(str) {
    var strArr = str.split("");
    //split: phân tách chuỗi thành mảng
    for(var i=0; i < str.length; i++){
        strArr[i]=String.fromCharCode(str.charCodeAt(i)+1);
    }
    return strArr.join("");
}
console.log(changeLetter(str));

//BT5
function front_between(str) {
    if (str.length>=3 && str.length%2 == 1) {
        mid = (str.length +1)/2;
        //slice: trích xuất phần tử giữa (a, b)
        return str.slice(mid - 2, mid + 1);
    }
    return str;
    }
console.log(front_between(str));

//BT6
function repeatNumber(n) {
    var nArr = str.split("");
    var mf = 1;
    var m = 0;
    var item;
    for (var i=0; i< nArr.length; i++)
    {
        for (var j=i; j < n.length; j++) {
            if (nArr[i] == nArr[j])
            m++;
            if (mf<m) {
                mf=m; 
                item = nArr[i];
            }
        }
        m =0;
    }
    console.log(item) ;
}

//BT7
function startWith(str){
    return str.indexOf("Java")===0;
}
console.log(startWith(str))

//BT8
function callMonth() {
    var month_number = function(dt) {
        mlist = [ "Tháng một", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12" ];
        return mlist[dt.getMonth()];
        };
    console.log(month_number(""));
}

//BT9
function longestWord(str) {
    var str = str.split(" ");
    var longest = 0;
    var word = null;
    for (var i = 0; i <= str.length - 1; i++) {
        if (longest < str[i].length) {
            longest = str[i].length;
            word = str[i];
        }
    }
    return word;
}

//BT10
function numberBetween() {
    const lower = parseInt(prompt('Enter number 1: '));
    const higher = parseInt(prompt('Enter number 2: '));
    console.log("So nguyen to giua ${lower} va ${higher} :");
    for (let i = lower; i <= higher; i++) {
        let flag = 0;
        for (let j = 2; j < i; j++) {
            if (i % j == 0) {
                flag = 1;
                break;
            }
        }
        if (i > 1 && flag == 0) {
            console.log(i);
        }
    }
}