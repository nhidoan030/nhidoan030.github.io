let load = function(event) {
    let image = document.getElementById('preview');
    image.src = URL.createObjectURL(event.target.files[0]);
};

function validate() {
    let name = document.getElementById("name"),
        category = document.getElementById("category"),
        file = document.getElementById("file");
        submit = true;
    if(!( name.value[0] < '0' || name.value[0] > '9') ) {
        document.getElementById("item_error").innerHTML="Khong the bat dau bang so";
        submit = false;
    }
    else if(name.value.length > 10){
        document.getElementById("item_error").innerHTML="Length must be less than 10";
        submit = false;
    }
    else if (name.value.toString().trim() == "") {
        document.getElementById("item_error").innerHTML= "Name must be filled out";
        submit = false;
    } else {
        document.getElementById("item_error").innerHTML = "";
    }
    if ( category.value === "noselect" || category.value === null) {
        document.getElementById("cate_error").innerHTML= "Category must be choosen";
        submit = false;
    } else {
        document.getElementById("cate_error").innerHTML = "";
    }
    if ( file.value == "") {
        document.getElementById("img_error").innerHTML= "File must be filled out";
        submit = false;
    } else {
        document.getElementById("img_error").innerHTML = "";
    }
    if (submit == false) return false; 
    return true;
}

document.querySelector("#file").addEventListener("change", function() {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        localStorage.setItem('file' ,reader.result);
        document.getElementById('previewimg').src = reader.result;
    });
    reader.readAsDataURL(this.files[0]);
});

window.onload = function () {
    let localStorageList = 'datas';

    loadFromLocalStorage();

    document.querySelector("#submit").addEventListener('click', function () {
        let name = document.getElementById("name"),
            category = document.getElementById("category"),
            file = document.getElementById("file");
    
    if (validate()) {
        let data = {
            name: name.value,
            category: category.value,
            file: localStorage.getItem('file'),
        };

        
        //Reset data
        name.value = '';
        category.value = '';
        file.value = '';
        document.getElementById('previewimg').src = '';

        appendObjectToLocalStorage(data);
    }
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
                tdfile = document.createElement("img"),
                tdRemove = document.createElement("td"),
                btnRemove = document.createElement("button");
                tdedit = document.createElement("td"),
                btnedit = document.createElement("button");
                //tdsave = document.createElement("td"),
                btnsave = document.createElement("button");
                //tdcancel = document.createElement("td"),
                btncancel = document.createElement("button");
                
            tdName.innerHTML = x.name;
            tdName.setAttribute('id', 'Name' + i);
            tdcategory.innerHTML = x.category;
            tdcategory.setAttribute('id', 'Cate' + i);
            tdfile.src = x.file;
            tdfile.setAttribute('id', 'Img' + i);
            tdfile.setAttribute('style', 'width: 40px');

            btnRemove.textContent = 'Remove';
            btnRemove.className = 'btn btn-xs btn-danger';
            btnRemove.setAttribute('value', 'Remove');
            btnRemove.setAttribute('id', 'Remove' + i);
            btnRemove.setAttribute('style', 'display: inline;');
            btnRemove.addEventListener('click', function() {
                removeFromLocalStorage(i);
            });

            btnedit.textContent = 'Edit';
            btnedit.className = 'btn btn-xs btn-danger';
            btnedit.setAttribute('value', 'Update');
            btnedit.setAttribute('id', 'Edit' + i);
            btnedit.setAttribute('style', 'display: inline; float: left;');
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
            btncancel.setAttribute('value', 'Cancel');
            btncancel.setAttribute('id', 'cancel' + i);
            btncancel.className = 'btn btn-xs btn-danger';
            btncancel.addEventListener('click', function(){
                cancelFromLocalStorage(i);
            });

            tdRemove.appendChild(btnRemove);
            tdedit.appendChild(btnedit);
            //tdsave.appendChild(btnsave);
            //tdcancel.appendChild(btncancel);

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
        loadFromLocalStorage(index);

        // btncancel = document.getElementById('cancel' + (index));
        // btncancel.setAttribute('style', 'display: none;');

        // btSave = document.getElementById('Save' + (index));
        // btSave.setAttribute('style', 'display: none;');

        // btnedit = document.getElementById('Edit' + (index));
        // btnedit.setAttribute('style', 'display: inline;');

        // btnRemove = document.getElementById('Remove' + (index));
        // btnRemove.setAttribute('style', 'display: inline;');


    }
    function editFromLocalStorage(index) {
        let tab = document.querySelector("#grid tbody").rows[index];
        for (i = 0; i < 2; i++) {
            if (i == 1) {
                let td = tab.getElementsByTagName("td")[i];
                    tdi = tab.getElementsByTagName("td")[i+1];
                    ele = document.createElement('select');      
                    ele.innerHTML = '<option>' + td.innerText + '</option><option>No select</option> <option>Category 1</option><option>Category 2</option><option>Category 3</option>';
                // for (k = 0; k < category.length; k++) {
                //     ele.innerHTML = ele.innerHTML +
                //         '<option>' + x.category[k] + '</option>';
                // }
                td.innerText = '';
                td.appendChild(ele);
                tdi.innerHTML = '<input type="file" onchange="load(event)"/><img id="preview" width = "70"/>'
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
        btncancel = document.getElementById('cancel' + (index));
        btncancel.setAttribute('style', 'cursor:pointer; display: inline;');

        btnsave = document.getElementById('Save' + (index));
        btnsave.setAttribute('style', 'display:inline;');

        btnedit = document.getElementById('Edit' + (index));
        btnedit.setAttribute('style', 'display:none;');

        btnRemove = document.getElementById('Remove' + (index));
        btnRemove.setAttribute('style', 'display:none;');
    }
    function saveFromLocalStorage(index) {

        loadFromLocalStorage(); 

    }
}
