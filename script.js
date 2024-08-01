const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');

//adding the item to the list
function addItem(e) 
{
    e.preventDefault();

    const newItem = itemInput.value;
    //validate input
    if (newItem === '')
    {
        alert('Please add an item');
        return;
    }

    //create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    
    const button = createButton('remove-item btn-link text-red');
    
    li.appendChild(button);
    itemList.appendChild(li);

    itemInput.value = '';
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


//removing an item from the list
function removeItem(e)
{
    if (e.target.closest('.remove-item'))
    {
        e.target.parentElement.parentElement.remove();
    }
    
}

function clearItem(e)
{
    
    while (itemList.firstChild)
    {
        itemList.removeChild(itemList.firstChild);
    }
}

itemForm.addEventListener("submit", addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItem);
