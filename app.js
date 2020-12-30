
function elementFactory(type,attributes,...children){
    const element = document.createElement(type);
    for(let key in attributes){
        element.setAttribute(key,attributes[key])
    }
    /*
    children.forEach(child => {
        if(child === "string"){
            element.appendChild(document.createTextNode(child))
        }else{
            element.appendChild(child)
        }
    })
    */
   document.body.appendChild(element);
    return element;
}

const itemInput = elementFactory("input",{class:"input"});
const costInput = elementFactory("input",{class:"input"});
const addItem = elementFactory("button", {class:"btn"});
const outputCart= elementFactory("button", {class:"btn"});

addItem.textContent = "Add Item";
outputCart.textContent = "Output Cart";

// create item object
class Item{
    constructor(name,cost){
        this.name = name;
        this.cost = cost
    }
}

const output = elementFactory("div");
const items = [];
const cart = {};
addItem.addEventListener("click",function(){
    const item = new Item(itemInput.value, costInput.value); // input values to create items
    if(items.indexOf(itemInput.value) >= 0){
        alert("Item already exists")
    }else{
    items.push(itemInput.value);
    const display = elementFactory("div",{class:"display"}); // display the item 
    display.innerHTML = `${item.name} <br> $${item.cost}`;
    display.addEventListener("click",function(){
        let itemAdded = item.name.toLowerCase();
        if(!cart[itemAdded]){
            cart[itemAdded] = {
                name : item.name,
                cost : item.cost,
                quantity : 1,
                subtotal : function(){
                    return this.quantity * this.cost
                }
            }
        }else{
            cart[itemAdded].quantity++
        }
      relist();
    })
    }
    itemInput.value ="";
    costInput.value ="";

});

function relist(){
    output.innerHTML = "";
    let total = 0;

    for(let product in cart){
        let subTotal = cart[product].subtotal();
        // using product only gives access to the name
        // using cart[product] gives access to the object
        output.innerHTML += `${cart[product].name} : $${cart[product].cost} *`;
        output.innerHTML += `${cart[product].quantity} = $${subTotal} <br>`;
        total += subTotal;
    }
   output.innerHTML += ` Total = $${total}`
}
