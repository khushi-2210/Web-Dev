
function createCustomElement() {
    let elementType = document.getElementById('elementType').value;
    let content = document.getElementById('elementContent').value;
    document.getElementById('elementContent').value = "";


    let newElement = document.createElement(elementType);

    switch (elementType) {
        case 'img':
            newElement.src = content;
            newElement.style.width = "100px";
            break;

        default:
            newElement.textContent = content;
    }

    let playground = document.getElementById('element-playground');
    playground.appendChild(newElement);
}

function clearPlayground() {
    let playground = document.getElementById("element-playground");
    playground.innerHTML = "";
    playground.innerHTML = "<p>Elements will be created here dynamically!</p>";
}

function addState(){
    let stateName= document.getElementById("newState").value;
    if (stateName !== ""){
        let li = document.createElement("li");
        li.textContent= stateName;

        document.getElementById("state-list").appendChild(li);

        // newState.value = "";
        document.getElementById("newState").value = "";
    }

    else{
        alert("Please enter the state name!")
    }
}

function removeLastState(){
    let statelist= document.getElementById("state-list");
    let lastItem = statelist.lastElementChild;

    if(lastItem){
        lastItem.style.background="white";
        lastItem.style.color="black";
        setTimeout(function(){
            lastItem.remove();
        },250);
    }
    else{
        alert("State list is already empty!");
    }
}

function sortStates(){
    let stateList=document.getElementById("state-list");
    let items=Array.from(stateList.children);
    items.sort(function(item1,item2){
        return item1.textContent.localeCompare(item2.textContent);
    })

    stateList.innerHTML= "";
    for(let i=0; i<items.length;i++){
        items[i].classList.add("fade-in");
        stateList.appendChild(items[i]);
    }

}