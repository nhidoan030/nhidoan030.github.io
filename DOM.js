let loadFile = function(event) {
    let image = document.getElementById('previewimg');
    image.src = URL.createObjectURL(event.target.files[0]);
};

window.onload = function () {
    let localStorageList = 'datas';

    loadFromLocalStorage();

    document.querySelector("#submit").addEventListener('click', function () {
        let name = document.getElementById("name"),
            category = document.getElementById("category"),
            file = document.getElementById("file");

        // Validate
        if (name.value.length === 0 || name.value.length > 10 || name.value === '' ) {
            document.getElementById("item_error").innerHTML = "* Nhap name";
            return;
        } else {
            document.getElementById("item_error").innerHTML = "";
        }
        if (category.value === "noselect") {
            document.getElementById("cate_error").innerHTML = "Chon cate";
            return;
        } else {
            document.getElementById("cate_error").innerHTML = "";
        }
        if (file.value === "") {
            document.getElementById("img_error").innerHTML = "Them anh";
            return;
        } else {
            document.getElementById("img_error").innerHTML = "";
        }
        
        let data = {
            name: name.value,
            category: category.value,
            file: file.value,
        };

        name.value = '';
        category.value = '';
        file.value = '';
        document.getElementById('previewimg').src = '';

        appendObjectToLocalStorage(data);
    })
    function appendObjectToLocalStorage(obj) {
        let datas = [],
            dataInLocalStorage = localStorage.getItem(localStorageList);

        if (dataInLocalStorage !== null) {
            datas = JSON.parse(dataInLocalStorage);
        }

        datas.push(obj);
        localStorage.setItem(localStorageList, JSON.stringify(datas));
        loadFromLocalStorage();
    }

    function loadFromLocalStorage() {
        let datas = [],
            dataInLocalStorage = localStorage.getItem(localStorageList),
            gridBody = document.querySelector("#grid tbody");

        if (dataInLocalStorage !== null) {
            datas = JSON.parse(dataInLocalStorage);
        }

        gridBody.innerHTML = '';

        datas.forEach(function (x, i) {
            let tr = document.createElement("tr"),
                tdName = document.createElement("td"),
                tdcategory = document.createElement("td"),
                tdfile = document.createElement("td"),
                tdRemove = document.createElement("td"),
                btnRemove = document.createElement("button");
                tdedit = document.createElement("td"),
                btnedit = document.createElement("button");
                tdsave = document.createElement("td"),
                btnsave = document.createElement("button");
                tdcancel = document.createElement("td"),
                btncancel = document.createElement("button");
                
            tdName.innerHTML = x.name;
            tdcategory.innerHTML = x.category;
            tdfile.innerHTML = x.file;

            btnRemove.textContent = 'Remove';
            btnRemove.className = 'btn btn-xs btn-danger';
            btnRemove.setAttribute('style', 'display: inline;');
            btnRemove.addEventListener('click', function(){
                removeFromLocalStorage(i);
            });

            btnedit.textContent = 'Edit';
            btnedit.className = 'btn btn-xs btn-danger';
            btnedit.setAttribute('value', 'Update');
            btnedit.setAttribute('id', 'Edit' + i);
            btnedit.setAttribute('style', 'display: inline;');
            btnedit.addEventListener('click', function(){
                editFromLocalStorage(i);
            });

            btnsave.textContent = 'Save';
            btnsave.className = 'btn btn-xs btn-danger';
            btnsave.setAttribute('value', 'Save');
            btnsave.setAttribute('id', 'Save' + i);
            btnsave.setAttribute('style', 'display: none;');
            btnsave.addEventListener('click', function(){
                saveFromLocalStorage(i);
            });

            btncancel.textContent = 'X';
            btncancel.setAttribute('style', 'display: none;');
            btncancel.setAttribute('title', 'Cancel');
            btncancel.setAttribute('id', 'cancel' + i);
            btncancel.className = 'btn btn-xs btn-danger';
            btncancel.addEventListener('click', function(){
                cancelFromLocalStorage(i);
            });

            tdRemove.appendChild(btnRemove);
            tdedit.appendChild(btnedit);
            tdsave.appendChild(btnsave);
            tdcancel.appendChild(btncancel);

            tr.appendChild(tdName);
            tr.appendChild(tdcategory);
            tr.appendChild(tdfile);
            tr.appendChild(tdedit).appendChild(tdRemove);
            tr.appendChild(btnsave);
            tr.appendChild(btncancel);
            
            gridBody.appendChild(tr);
        });
    }

    function removeFromLocalStorage(index){
        let datas = [],
            dataInLocalStorage = localStorage.getItem(localStorageList);
        datas = JSON.parse(dataInLocalStorage);
        datas.splice(index, 1);
        localStorage.setItem(localStorageList, JSON.stringify(datas));
        loadFromLocalStorage();
    }
    function cancelFromLocalStorage(index) {

    }
    function editFromLocalStorage(index) {
        btnsave.setAttribute('style', 'display:inline;');
        btnedit.setAttribute('style', 'display:none;');
        //btnRemove.setAttribute('style', 'display:none;');
        btncancel.setAttribute('style', 'display: inline;');
        let tab = document.querySelector("#grid tbody").rows[index];
        for (i = 0; i < 2; i++) {
            if (i == 1) {
                let td = tab.getElementsByTagName("td")[i];
                    tdi = tab.getElementsByTagName("td")[i+1];
                    ele = document.createElement('select');      
                    ele.innerHTML = '<option>' + td.innerText + '</option><option>No select</option> <option>Category 1</option><option>Category 2</option><option>Category 3</option>';
                // for (k = 0; k < category.length; k++) {
                //     ele.innerHTML = ele.innerHTML +
                //         '<option>' + category[k] + '</option>';
                // }
                td.innerText = '';
                td.appendChild(ele);
                tdi.innerHTML = '<input type="file" onchange="loadFile(event)"/>' + '<img id="previewimg"/>'
            }
            else {
                let td = tab.getElementsByTagName("td")[i];
                let ele = document.createElement('input');     
                ele.setAttribute('type', 'text');
                ele.setAttribute('value', td.innerText);
                td.innerText = '';
                td.appendChild(ele);
            }
        }
        localStorageList();
    }
    function saveFromLocalStorage() {
        let tab = document.querySelector("#grid tbody").rows[index];
    }
}
