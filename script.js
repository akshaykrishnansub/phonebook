document.addEventListener("DOMContentLoaded",()=>{
    const firstNameInput=document.getElementById('fn-input');
    const lastNameInput=document.getElementById('ln-input');
    const phoneNumberInput=document.getElementById('phn-input');
    const emailInput=document.getElementById('email-input');
    const submitButton=document.getElementById('subBtn');
    const contactList=document.getElementById('contact-list');
    const form=document.getElementById('contact-form');
    let contacts=JSON.parse(localStorage.getItem("contacts"))||[]; //not declared as const because elements declared as const cannot be reassigned. Also this item loads data that is already there in the localstorage. If no 
    //data is found, the empty array is returned
    contactsDisplay(contacts);
    const searchInput=document.getElementById('search-input');
    searchInput.addEventListener('keyup',searchContacts);
    form.addEventListener("submit",(e)=>{
        e.preventDefault(); //prevents default refresh

        //declaring a contact object
        const contact={
            id:Date.now(),
            firstname: firstNameInput.value,
            lastname: lastNameInput.value,
            phonenumber: phoneNumberInput.value,
            email:emailInput.value
        }
        contacts.push(contact);
        console.log(contacts);
        saveTasksToLocalStorage();
        contactsDisplay(contacts);
        //reseting all input values once data is submitted
        firstNameInput.value="";
        lastNameInput.value="";
        phoneNumberInput.value="";
        emailInput.value="";
    })

    //save tasks to local storage
    function saveTasksToLocalStorage(){
        localStorage.setItem("contacts",JSON.stringify(contacts));
    }

    //function to delete contacts
    contactList.addEventListener("click",(e)=>{
        if(e.target.classList.contains('delete-btn')){
            const id=parseInt(e.target.dataset.id); //id is the id of the target button that is clicked
            contacts=contacts.filter(contact=>contact.id!==id);
            saveTasksToLocalStorage();
            //displaying the contacts
            contactsDisplay(contacts);
        }

        //edit functionality
        if(e.target.classList.contains('edit-btn')){
            const id=parseInt(e.target.dataset.id);
            const contact=contacts.find(contact=>contact.id===id);
            document.getElementById('fn-input').value=contact.firstname;
            document.getElementById('ln-input').value=contact.lastname;
            document.getElementById('phn-input').value=contact.phonenumber;
            document.getElementById('email-input').value=contact.email;
            contacts=contacts.filter(contact=>contact.id!==id);
            saveTasksToLocalStorage();
            contactsDisplay(contacts);
        }
    })
    //function definition to display contacts
    function contactsDisplay(contacts){
        contactList.innerHTML="";
        contacts.forEach(contact=>{
            const rowElement=document.createElement('tr');
            rowElement.innerHTML=`
            <td style="width:300px">${contact.firstname}</td>
            <td style="width:300px">${contact.lastname}</td>
            <td style="width:300px">${contact.phonenumber}</td>
            <td style="width:300px">${contact.email}</td>
            <td>
                <button class='edit-btn' data-id='${contact.id}'>Edit</button>
                <button class='delete-btn' data-id='${contact.id}'>Delete</button>
            </td>`
            contactList.appendChild(rowElement)
        })
    }

    //function to search contacts
    function searchContacts(){
        let searchInput=document.getElementById('search-input').value;
        searchInput=searchInput.toLowerCase();
        let x=document.getElementsByTagName('tr');
        for(let i=0;i<x.length;i++){
            if(!x[i].innerHTML.toLowerCase().includes(searchInput)){
                x[i].style.display="none";
            }else{
                x[i].style.display="table-row";
            }
        }
    }
})