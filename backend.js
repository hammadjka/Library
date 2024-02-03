const myLibrary = [];

let template = document.getElementById("template");
let library = document.getElementById("library");
let defaultCover = document.getElementById("coverText").textContent;
let bookID = 1;
function Book(title, author, pages, cover, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.cover = cover;
    this.read = read;
    this.id = id
}
function findIndexByProperty(propertyName, propertyValue) {
    return myLibrary.findIndex(function(element) {
        return element[propertyName] == propertyValue;
    });
}
function addBookToLibrary(title, author, pages, cover, read, ID){
    let book = new Book(title, author, pages, cover, read, ID);
    myLibrary.push(book);
    let newBook = template.cloneNode(true);
    newBook.setAttribute('id', ID);
    newBook.querySelector(".bookTitle").textContent  = title;
    newBook.querySelector(".bookAuthor").textContent  = author;
    newBook.querySelector(".bookPages").textContent  = pages;
    newBook.querySelector(".bookDelete").setAttribute('data-value', ID);
    newBook.querySelector(".bookCover").setAttribute('data-value', ID);
    if (read) {
        readBook(newBook.querySelector(".bookRead"));
    }
    newBook.style.display = "grid";
    library.appendChild(newBook);
}
function removeBookFromLibrary(ID){
    let book = document.getElementById(ID);
    if (book) {
        book.remove();
    } else {
        console.log('book', ID, 'not found');
    }
    myLibrary.splice(findIndexByProperty('id', ID), 1);
}
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('bookDelete')) {
        removeBookFromLibrary(event.target.getAttribute("data-value"));
    }
});

function readBook(bookReadButton){
    bookReadButton.style.backgroundColor = "#228B22"; 
    bookReadButton.style.backgroundImage = "url('Resources/check.svg')"; 
    bookReadButton.style.backgroundRepeat = "no-repeat";
    bookReadButton.setAttribute('data-value', 'read'); 
}
function unReadBook(bookReadButton){
    bookReadButton.style.backgroundColor = "rgba(0, 0, 0, 0.2)"; 
    bookReadButton.style.backgroundImage = "url('Resources/check.svg')"; 
    bookReadButton.style.backgroundRepeat = "no-repeat";
    bookReadButton.setAttribute('data-value', 'unread'); 
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('bookRead')) {
        if(event.target.getAttribute('data-value') === "read"){
            unReadBook(event.target);
        }
        else{
            readBook(event.target);
        }
    }
});



document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById("pages").value;
    const cover = document.getElementById('cover').value;
    const read = document.getElementById('read').checked;
    addBookToLibrary(title, author, pages, cover, read, bookID);
    bookID++;
    hideModal();
});

let modal = document.getElementById("myModal");
let modalBtn = document.getElementById("add");
let modalSpan = document.getElementsByClassName("close")[0];

function showModal() {
    modal.style.display = "flex";
    modal.style.justifyContent = "center"
}
function hideModal(){
    modal.style.display = "none";
    let form = modal.querySelector('#form');
    if (form) {
        form.reset();
    }
}

modalBtn.addEventListener("click", showModal);
modalSpan.addEventListener('click', hideModal);
window.addEventListener('click', function(event) {
    if (["myModal", "modalContainer"].includes(event.target.id)) {
      hideModal();
    }
});

let cover = document.getElementById("myCover");
let closeCover = document.getElementById('closeCover');
function showCover(ID) {
    cover.style.display = "flex";
    cover.style.justifyContent = "center"
    console.log(myLibrary)
    if(ID != "template"){
        console.log(ID);
        console.log(findIndexByProperty('id', ID));
        document.getElementById("coverText").textContent = myLibrary[findIndexByProperty('id', ID)].cover;
    }
    else{
        document.getElementById("coverText").textContent = defaultCover;
    }
}
function hideCover(){
    cover.style.display = "none";
}

closeCover.addEventListener('click', hideCover);
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('bookCover')) {
        showCover(event.target.getAttribute("data-value"));
    }
});
window.addEventListener('click', function(event) {
    if (["myCover", "coverContainer"].includes(event.target.id)) {
        hideCover();
    }
});