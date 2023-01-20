// const addBookButton = document.querySelector(".add_book");
// addBookButton.addEventListener("click", () => {
//   displayBooks();
// });

const bookForm = document.querySelector(".form");
const overlay = document.querySelector(".overlay_for_form");
const closeFormButton = document.querySelector(".close_form_button");
const addBookButton = document.querySelector(".add_book");
function openForm() {
  bookForm.classList.add("active");
  overlay.classList.add("active");
}
function closeForm() {
  bookForm.classList.remove("active");
  overlay.classList.remove("active");
}
addBookButton.addEventListener("click", () => {
  openForm();
});
closeFormButton.addEventListener("click", () => {
  closeForm();
});
overlay.addEventListener("click", () => {
  closeForm();
});

const submitFormButton = document.querySelector(".form_submit");
submitFormButton.addEventListener("click", (event) => {
  submitFunction(event);
});

const bookTable = document.querySelector(".book_table");
const allBooks = document.querySelector(".all_books");
const myLibrary = [];

// setting up example books for start page

const exampleBook_1 = new createBook(
  "Harry Potter and the Chamber of Secrets",
  "J.K. Rowling",
  false
);
const exampleBook_2 = new createBook("the Stranger", "Albert Camus", true);

myLibrary.splice(-1, 0, exampleBook_1, exampleBook_2);
console.log(myLibrary);
//

// removes the book from storing array, and re-indexes and displays the remainder
function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

// this func changes the read status(this.isRead) and creates everything again
function changeIsRead(index) {
  console.log(myLibrary[index].isRead);
  myLibrary[index].isRead = !myLibrary[index].isRead;
  displayBooks();
}

function displayBooks() {
  allBooks.innerHTML = "";
  let i = 0;
  myLibrary.forEach(function (book) {
    const newBookDiv = document.createElement("div");
    newBookDiv.classList.add("book");
    newBookDiv.setAttribute("data-book-index", `${i}`);
    allBooks.appendChild(newBookDiv);

    const newBookTitle = document.createElement("div");
    newBookTitle.classList.add("title");
    newBookTitle.innerHTML = book.title;
    newBookTitle.setAttribute("data-book-index", `${i}`);
    newBookDiv.appendChild(newBookTitle);

    const newBookAuthor = document.createElement("div");
    newBookAuthor.classList.add("author");
    newBookAuthor.innerHTML = book.author;
    newBookAuthor.setAttribute("data-book-index", `${i}`);
    newBookDiv.appendChild(newBookAuthor);

    const newBookIsRead = document.createElement("button");
    newBookIsRead.classList.add("button");
    newBookIsRead.classList.add("is_read");
    newBookIsRead.setAttribute("data-book-index", `${i}`);
    if (book.isRead === true) {
      newBookIsRead.innerHTML = ":)";
      newBookIsRead.style.backgroundColor = "#3FBF7F";
    } else {
      newBookIsRead.innerHTML = ":(";
      newBookIsRead.style.backgroundColor = "#BF3F3F";
    }
    newBookIsRead.addEventListener("click", () => {
      changeIsRead(newBookIsRead.getAttribute("data-book-index"));
    });
    newBookDiv.appendChild(newBookIsRead);

    const newBookDeleteButton = document.createElement("button");
    newBookDeleteButton.classList.add("button");
    newBookDeleteButton.classList.add("remove_book");
    newBookDeleteButton.setAttribute("data-book-index", `${i}`);
    newBookDeleteButton.innerHTML = `&#x2716;`;
    newBookDeleteButton.addEventListener("click", () => {
      removeBook(newBookDeleteButton.getAttribute("data-book-index"));
    });
    newBookDiv.appendChild(newBookDeleteButton);

    i++;
  });

  i = 0;
}

function createBook(title, author, isRead) {
  // takes title, author and isRead and returns the new Book object
  function Book(title, author, isRead) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
  }
  const newBook = new Book(title, author, isRead);
  return newBook;
}

function submitFunction(event) {
  function clearFormFields() {
    titleFromForm.value = "";
    authorFromForm.value = "";
    isReadFromForm.checked = false;
  }
  function addBook(newBook) {
    myLibrary.push(newBook);
    console.log(newBook);
    console.log(myLibrary);
    displayBooks();
    clearFormFields();
  }

  event.preventDefault();
  const titleFromForm = document.querySelector("#form_title");
  const authorFromForm = document.querySelector("#form_author");
  const isReadFromForm = document.querySelector("#form_is-read");

  if (titleFromForm.value === "" || authorFromForm.value === "") {
    alert("Please fill out Title and Author fields");
    return;
  }

  const newBook = createBook(
    titleFromForm.value,
    authorFromForm.value,
    isReadFromForm.checked
  );

  addBook(newBook);
  closeForm();
}

displayBooks();
