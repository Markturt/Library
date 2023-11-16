const addButton =document.querySelector("#wrapper>button");
const dialog=document.getElementById("modal")
const submitButton=document.querySelector("button[type='submit']");
const wrapper=document.querySelector("main#wrapper");

const bookTitle=document.querySelector('[name="title"]');
const bookAuthor=document.querySelector('[name="Author"]');
const pages=document.querySelector('[name="numberOfPages"]');
const read=document.querySelector('[name="read"]');

let myLibrary=[];
function Book(title,author,pages,read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}
function addToMyLibrary(book){
    myLibrary.push(book);
}

function updateDisplay(book){

        book=myLibrary[myLibrary.length-1];

        let collection=document.createElement("div");
        let collectorButton=document.createElement("button")
        let readButton=document.createElement("button")

        let title=document.createElement("div");
        let author=document.createElement("div");
        let pages=document.createElement("div");

        title.textContent=book.title;
        author.textContent=book.author;
        pages.textContent= book.pages +" pages";
        if(book.read=="true"){
            readButton.textContent="Read";
            readButton.className="read";
        }
        else{
            readButton.textContent="Not Read";
            readButton.className="notRead"
        }
        
        collectorButton.className="remove";
        collection.setAttribute("class","collector");

        readButton.addEventListener("click",()=>{
            if( readButton.className=="read"){
                
                readButton.textContent="Not Read";
                readButton.className="notRead";

            }
            else{
                readButton.textContent="Read"
                readButton.className="read"
            }
        })
        collectorButton.textContent="Remove"

        collection.appendChild(title);
        collection.appendChild(author);
        collection.appendChild(pages);
        collection.appendChild(readButton);
        collection.appendChild(collectorButton);
        
        
        wrapper.append(collection);
        removeBook(collectorButton);
    }
function removeBook(btn){
    btn.addEventListener("click",()=>{
        let btnParent=btn.parentNode;
        let grandParent=btnParent.parentNode;
        grandParent.removeChild(btnParent);
    })
}

dialog.addEventListener("close",(e)=>{
    if(read.checked){
       read.value="true";
    }
    else{
        read.value="false";
    }
   
    let book=new Book(bookTitle.value,bookAuthor.value,pages.value,read.value);
    addToMyLibrary(book);

    updateDisplay(myLibrary);

    bookTitle.value="";
    bookAuthor.value="";
    pages.value="";  
})
addButton.addEventListener("click",()=>{
    dialog.showModal();
})
submitButton.addEventListener("click",(e)=>{
    if(bookTitle.valid && bookAuthor.valid && pages.valid){
        e.preventDefault();
        dialog.showModal();
    }
    else{
        dialog.close();
    }
})