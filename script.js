const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

//displaying items from local storage
function displayItems()
{
    const itemsFromStorage = getItemFromStorage();
    itemsFromStorage.forEach((item) => addItemToDom(item));

    checkUI();
}

//adding the item to the list
function onAddItemSubmit(e) 
{
    e.preventDefault();

    const newItem = itemInput.value;
    //validate input
    if (newItem === '')
    {
        alert('Please add an item');
        return;
    }

    //check for edit mode
    if (isEditMode)
    {
        const itemToEdit = itemList.querySelector('.edit-mode');
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    }
    else
    {
        if (checkIfItemExists(newItem))
        {
            alert('That item already exists');
            return;
        }
    }

    //create item DOM element
    addItemToDom(newItem);

    //add item to local storage
    addItemToStorage(newItem);

    checkUI();

    itemInput.value = '';
}

//add item to the DOM
function addItemToDom(item)
{
    //create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    
    const button = createButton('remove-item btn-link text-red');
    
    li.appendChild(button);
    
    //adding li to the DOM
    itemList.appendChild(li);
}

function filterItems(e)
{
    const text = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll('li');
    items.forEach(function(item)
    {
        const itemName = item.firstChild.textContent;
        if (itemName.toLowerCase().indexOf(text) != -1)
        {
            item.style.display = 'flex';
        }
        else
        {
            item.style.display = 'none';
        }
    });
}

//create a button with an icon
function createButton(classes)
{
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

//this goes to the parent element, which is createButton
function createIcon(classes)
{
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

//adding item to local storage
function addItemToStorage(item)
{
    const itemsFromStorage = getItemFromStorage();
    //add item to array
    itemsFromStorage.push(item);

    //convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));

    //console.log(itemsFromStorage);
}


function getItemFromStorage()
{
    let itemsFromStorage;

    if (localStorage.getItem('items') === null)
    {
        itemsFromStorage = [];
    }
    else
    {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function setItemToEdit(item)
{
    isEditMode = true;

    const items = itemList.querySelectorAll('li');
    items.forEach((i) => 
    {
        if (i === item)
        {
            i.classList.add('edit-mode');
        }
        else
        {
            i.classList.remove('edit-mode');
        }
    });

    //calling edit-mode from css
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#28a745';
    itemInput.value = item.textContent;

}

function onClickItem(e)
{
    if (e.target.parentElement.classList.contains('remove-item'))
    {
        removeItem(e.target.parentElement.parentElement);        
    }
    else
    {
        setItemToEdit(e.target);
    }
}

function checkIfItemExists(item)
{
    const itemsFromStorage = getItemFromStorage();

    return itemsFromStorage.includes(item);
}

//removing an item from the list
function removeItem(item)
{   
    if (confirm('Are you sure?'))
    {
        //remove item from DOM
        item.remove();

        //remove item from local storage
        removeItemFromStorage(item.textContent);

        checkUI();
    }
}

function removeItemFromStorage(item)
{
    let itemsFromStorage = getItemFromStorage();

    //filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    //re-set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));

    //console.log(itemsFromStorage);
}

function clearItem(e)
{
    if (confirm('Are you sure?'))
    {
        while (itemList.firstChild)
            {
                itemList.removeChild(itemList.firstChild);
                checkUI();
            }
    }
    localStorage.removeItem('items');
    checkUI();
    
}

function checkUI()
{
    itemInput.value = '';

    const items = itemList.querySelectorAll('li');
    
    
    if (items.length === 0)
    {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }
    else
    {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';

    isEditMode = false;
}

//initialize app
function init()
{
    itemForm.addEventListener("submit", onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItem);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);
    checkUI();
}

init()