let add = document.querySelector('.classes-to-add')
let remove = document.querySelector('.classes-to-remove')
function createClass(value){
    results.classList.add(value.toLowerCase())
        let element = document.createElement('div')
        element.innerText = value.toLowerCase()
        element.style.cssText = `
            width:fit-content;
            height:fit-content;
            background-color:#dd6408;
            border-radius:5px;
            display:grid;
            place-items:center;
            color:white;
            padding:.5em;
            cursor:pointer;
        `
        results.appendChild(element)
}

function removeClass(value){
    for(let i of results.classList){
        if(i == value.toLowerCase())
            results.classList.remove(value.toLowerCase())
    }
    for(i of results.children){
        if(i.innerText.toLowerCase() == value.toLowerCase())
            i.remove();
    }
}

function checking(value,method,field){
    if(value !== ''){
        if (value.includes(' '))
            value.split(' ').forEach(e=>method(e))
        else
            method(value)
        field.value = ''

    }
}

function eventListeners(ele,fun){
    ele.onblur = () =>checking(ele.value,fun,ele)
    ele.addEventListener('keyup', e => {
        if (e.key == 'Enter')
            checking(ele.value,fun,ele)
})
}

eventListeners(add,createClass)
eventListeners(remove,removeClass)

let callback = (mutationList,observer) => {
    for (let curr of mutationList){
        if(curr.type === 'childList'){
            for (let i of results.children){
                i.addEventListener('click',()=>i.remove())
            }
        }
    }
}

let observer = new MutationObserver(callback)

let config = {childList:true}
observer.observe(results,config)