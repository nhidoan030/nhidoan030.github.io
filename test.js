
function validate() {
    const itemName = document.getElementById("item").value;
    const cateName = document.getElementById("category").value;
    const fileName = document.getElementById("file").value;
    if (!itemName || itemName.length > 10 ) {
        document.getElementById("item_error").innerHTML = "* Nhap name";
        return false;
    } else {
      document.getElementById("item_error").innerHTML = "";
    }
    if (cateName === "noselect") {
        document.getElementById("cate_error").innerHTML = "Chon cate";
        return false;
    } else {
        document.getElementById("cate_error").innerHTML = "";
    }
    if (fileName === "") {
        document.getElementById("img_error").innerHTML = "Them anh";
        return false;
    } else {
        document.getElementById("img_error").innerHTML = "";
    }
    return true;
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
    SubmitInput();
    resetForm();
  });
  
  function getInput(){
    let nameInput = document.getElementById('item').value;
    localStorage.setItem('item', nameInput);
    
    let cateInput = document.getElementById( 'category').value;
    localStorage.setItem('category', cateInput);
  
    let imgInput = document.getElementById( 'file').value;
    localStorage.setItem('file', imgInput);
    }
  
  
  function SubmitInput() {
    let JsObject =[];
    let nameInput = document.getElementById('item').value;
    let cateInput = document.getElementById('category').value;
    let imgInput = document.getElementById( 'file').value;
  
    if (localStorage.getItem('datastorage')) {
      JsObject = JSON.parse(localStorage.datastorage);
    }
    JsObject.push({'Name':nameInput, 'Category':cateInput, 'Image': imgInput});
    localStorage.setItem('datastorage', JSON.stringify(JsObject));
    console.log(JsObject);
    crudApp.createTable();
  }

function resetForm() {
document.getElementById('form').reset();
}

let loadFile = function(event) {
    let image = document.getElementById('previewimg');
    image.src = URL.createObjectURL(event.target.files[0]);
};
  
let crudApp = new function () {

    // AN ARRAY OF JSON OBJECTS WITH VALUES.
    this.listdata = JSON.parse(localStorage.getItem('datastorage')) || [];
    this.category = ['No select', 'Category 1', 'Category 2', 'Category 4'];
    this.col = [];

    this.createTable = function () {

        // EXTRACT VALUE FOR TABLE HEADER.
        for (let i = 0; i < this.listdata.length; i++) {
            for (let key in this.listdata[i]) {
                if (this.col.indexOf(key) === -1) {
                    this.col.push(key);
                }
            }
        }

        // CREATE A TABLE.
        let table = document.createElement('table');
        table.setAttribute('id', 'dataTable');     // SET TABLE ID.

        let tr = table.insertRow(-1);               // CREATE A ROW (FOR HEADER).

        for (let h = 0; h < this.col.length; h++) {
            // ADD TABLE HEADER.
            let th = document.createElement('th');
            th.innerHTML = this.col[h].replace('_', ' ');
            tr.appendChild(th);
        }

        // ADD ROWS USING JSON DATA.
        for (let i = 0; i < this.listdata.length; i++) {

            tr = table.insertRow(-1);           // CREATE A NEW ROW.

            for (let j = 0; j < this.col.length; j++) {
                let tabCell = tr.insertCell(-1);
                tabCell.innerHTML = this.listdata[i][this.col[j]];
            }

            // DYNAMICALLY CREATE AND ADD ELEMENTS TO TABLE CELLS WITH EVENTS.

            this.td = document.createElement('td');

            // *** SAVE.
            tr.appendChild(this.td);
            let btSave = document.createElement('input');

            btSave.setAttribute('type', 'button');      // SET ATTRIBUTES.
            btSave.setAttribute('value', 'Save');
            btSave.setAttribute('id', 'Save' + i);
            btSave.setAttribute('style', 'display:none;');
            btSave.setAttribute('onclick', 'crudApp.Save(this)');       // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btSave);

            // *** UPDATE.
            tr.appendChild(this.td);
            let btUpdate = document.createElement('input');

            btUpdate.setAttribute('type', 'button');    // SET ATTRIBUTES.
            btUpdate.setAttribute('value', 'Update');
            btUpdate.setAttribute('id', 'Edit' + i);
            btUpdate.setAttribute('style', 'background-color:#44CCEB;');
            btUpdate.setAttribute('onclick', 'crudApp.Update(this)');   // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btUpdate);

            // *** DELETE.
            this.td = document.createElement('th');
            tr.appendChild(this.td);
            let btDelete = document.createElement('input');
            btDelete.setAttribute('type', 'button');    // SET INPUT ATTRIBUTE.
            btDelete.setAttribute('value', 'Delete');
            btDelete.setAttribute('style', 'background-color:#ED5650;');
            btDelete.setAttribute('onclick', 'crudApp.Delete(this)');   // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btDelete);
        }


        // ADD A ROW AT THE END WITH BLANK TEXTBOXES AND A DROPDOWN LIST (FOR NEW ENTRY).

        this.td = document.createElement('td');
        tr.appendChild(this.td);

        let div = document.getElementById('table');
        div.innerHTML = '';
        div.appendChild(table);    // ADD THE TABLE TO THE WEB PAGE.
    };

    // ****** OPERATIONS START.

    // CANCEL.
    this.Cancel = function (oButton) {

        // HIDE THIS BUTTON.
        let activeRow = oButton.parentNode.parentNode.rowIndex;

        // HIDE THE SAVE BUTTON.
        let btSave = document.getElementById('Save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:none;');

        // SHOW THE UPDATE BUTTON AGAIN.
        let btUpdate = document.getElementById('Edit' + (activeRow - 1));
        btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

        let tab = document.getElementById('dataTable').rows[activeRow];

        for (i = 0; i < this.col.length; i++) {
            let td = tab.getElementsByTagName("td")[i];
            td.innerHTML = this.listdata[(activeRow - 1)][this.col[i]];
        }
    }


    // EDIT DATA.
    this.Update = function (oButton) {
        let activeRow = oButton.parentNode.parentNode.rowIndex;
        let tab = document.getElementById('dataTable').rows[activeRow];

        // SHOW A DROPDOWN LIST WITH A LIST OF CATEGORIES.
        for (i = 0; i < 2; i++) {
            if (i == 1) {
                let td = tab.getElementsByTagName("td")[i];
                let ele = document.createElement('select');      // DROPDOWN LIST.
                ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
                for (k = 0; k < this.category.length; k++) {
                    ele.innerHTML = ele.innerHTML +
                        '<option value="' + this.category[k] + '">' + this.category[k] + '</option>';
                }
                td.innerText = '';
                td.appendChild(ele);
            }
            else {
                let td = tab.getElementsByTagName("td")[i];
                let ele = document.createElement('input');      // TEXTBOX.
                ele.setAttribute('type', 'text');
                ele.setAttribute('value', td.innerText);
                td.innerText = '';
                td.appendChild(ele);
            }
        }

        let btSave = document.getElementById('Save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;');

        // HIDE THIS BUTTON.
        oButton.setAttribute('style', 'display:none;');
    };


    // DELETE DATA.
    this.Delete = function (oButton) {
        let activeRow = oButton.parentNode.parentNode.rowIndex;
        this.listdata.splice((activeRow - 1), 1);    // DELETE THE ACTIVE ROW.
        this.createTable();                         // REFRESH THE TABLE.
    };

    // SAVE DATA.
    this.Save = function (oButton) {
 
        this.createTable();     // REFRESH THE TABLE.
    }
}

crudApp.createTable();