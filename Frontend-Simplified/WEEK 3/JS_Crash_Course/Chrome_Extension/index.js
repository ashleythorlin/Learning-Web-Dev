
//VARIABLES
let myLeads = []
let oldLeads = []

// myLeads = JSON.parse(myLeads)
// myLeads.push("www.itsyaboi.com")
// myLeads = JSON.stringify(myLeads)
// console.log(typeof myLeads)

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

//renders saved leads when refreshed/app opened
if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


//FUNCTIONS
inputBtn.addEventListener("click", function(){
    if(inputEl.value != ""){
        myLeads.push(inputEl.value)
        inputEl.value = ""

        localStorage.setItem("myLeads", JSON.stringify(myLeads))

        render(myLeads)

        console.log(localStorage.getItem("myLeads"))
    }
    
})

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })

    
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)

})

function render(leads){
    let listItems = ""
    for(let i = 0; i < leads.length; i++){
        // const li = document.createElement("li")
        // li.textContent = myLeads[i]
        // ulEl.append(li);
        listItems += `
            <li>
                <a href='${leads[i]}' target='_blank'>
                    ${leads[i]}
                </a>
            </li>
            `
    }

    ulEl.innerHTML = listItems
}
