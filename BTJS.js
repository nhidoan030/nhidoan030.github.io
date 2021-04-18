//BT1 C1
function showTime() {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/" + (currentdate.getMonth()+1) + "/" + currentdate.getFullYear() + " "+ currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    var datetimeElement = document.getElementById("result1");
    datetimeElement.innerHTML = datetime;
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
        outPutdate = datetime1 + "     " + timedate2 + "     "+ dateTime3 + "    " + timeDate4;
    document.getElementById("result2").innerHTML = outPutdate;
}


//BT3
function isIncrease() {
    var numbers = document.getElementById("ex3-input").value;
    for (let num = 0; num < numbers.length - 1; num++) {
        if (numbers[num] < numbers[num + 1]) {
            alert("True");
        }
        else alert("False");
    }
}

//BT4
function changeLetter() {
    var str = document.getElementById("ex4-input").value;
    var strArr = str.split("");
    //split: phân tách chuỗi thành mảng
    for(var i=0; i < str.length; i++){
        strArr[i]=String.fromCharCode(str.charCodeAt(i)+1);
    }
    alert(strArr.join(""));
}
//console.log(changeLetter(str));

//BT5
function front_between() {
    var str = document.getElementById("ex5-input").value;
    if (str.length >= 3 && str.length %2 == 1) {
        mid = (str.length +1)/2;
        alert(str.slice(mid - 2, mid + 1));
    } else alert("Invalid");
}
//console.log(front_between(str));

//BT6
function repeatNumber() {
    var str = document.getElementById("ex6-input").value;
    var nArr = str.split("");
    var mf = 1;
    var m = 0;
    var item;
    for (var i=0; i< nArr.length; i++)
    {
        for (var j=i; j < nArr.length; j++) {
            if (nArr[i] == nArr[j])
            m++;
            if (mf<m) {
                mf=m; 
                item = nArr[i];
            }
        }
        m =0;
    }
    alert(item) ;
}

//BT7
function startWith(str){
    var str = document.getElementById("ex7-input").value;
    if (str.indexOf("Java")===0)
        alert("co" ,startWith(str));
    else alert ("khong")
}


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
    var str = document.getElementById("ex9-input").value;
    var str = str.split(" ");
    var longest = 0;
    var word = null;
    for (var i = 0; i <= str.length - 1; i++) {
        if (longest < str[i].length) {
            longest = str[i].length;
            word = str[i];
        }
    }
    alert(word);
}

//BT10
function numberBetween() {
    const lower = document.getElementById("ex10-input1").value;
    const higher =document.getElementById("ex10-input2").value;
    for (let i = lower; i <= higher; i++) {
        let flag = 0;
        for (let j = 2; j < i; j++) {
            if (i % j == 0) {
                flag = 1;
                break;
            }
        }
        if (i > 1 && flag == 0) {
            alert(i);
        }
    }
}
