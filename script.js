const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
//const items = itemList.querySelectorAll('li');

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
    
    //adding li to the DOM
    itemList.appendChild(li);

    checkUI();

    itemInput.value = '';
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


//removing an item from the list
function removeItem(e)
{
    if (e.target.closest('.remove-item'))
    {
        if (confirm('Are you sure?'))
        {
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
        
    }
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
    
}

function checkUI()
{
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
}



itemForm.addEventListener("submit", addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItem);
itemFilter.addEventListener('input', filterItems);

checkUI();