let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'Create';
let tmp;
// Get Total With Function
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}
// Create Product With Function
let dataProduct;
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product)
}else {
    dataProduct = [];
}

submit.onclick = function () {
    let newProduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if (title.value != '' && price.value != '' && category.value != '' && newProduct.count < 201) {
        if (mood === 'Create') {
            if (newProduct.count > 1) {
                for(let i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct);
                }
            }else {
                dataProduct.push(newProduct);
            }
            clearData()
        }else {
            dataProduct[tmp] = newProduct;
            mood = 'Create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
    }


    localStorage.setItem('product', JSON.stringify(dataProduct));
    showData()
}
// Clear Inputs
function clearData () {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
// Read Products Data
function showData () {
    getTotal()
    let table = '';
    for(let i = 0; i < dataProduct.length; i++) {
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
        <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteAll = document.getElementById('delete-all');
    if(dataProduct.length > 0) {
        deleteAll.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataProduct.length})</button>
        `
    }else {
        deleteAll.innerHTML = '';
    }
}
showData()
// Delete Product
function deleteProduct(i) {
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    showData()
}

function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0);
    showData()
}

// Update Product
function updateProduct(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = dataProduct[i].category;
    submit.innerHTML = 'Update';
    mood = 'Update'
    tmp = i;
}
// Search Products
let searchMood = 'title';

function getSearchMood(id) {
    let searchPar = document.getElementById('search');
    if(id == 'search-title') {
        searchMood = 'title'
    }else {
        searchMood = 'category';
    }
    searchPar.placeholder = 'Search By ' + searchMood;
    searchPar.focus();
    searchPar.value = '';
    showData()
}

function searchData(value) {
    let table = '';
    if (searchMood == 'title') {
        for(let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].title.includes(value)) {
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                </tr>`;
            }
        } 
    }else {
        for(let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                </tr>`;
            }
        } 
    }
    document.getElementById('tbody').innerHTML = table;
}