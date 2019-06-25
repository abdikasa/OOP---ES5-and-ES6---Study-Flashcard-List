
// (function () {
//     let tableHeader = document.getElementById('num-of-tasks');
//     function upperCase(node) {
//         return node.textContent.toUpperCase();
//     }
//     tableHeader.textContent = upperCase(tableHeader);
// })()


//CueCard Constructor
//Creating the Cue Card

function CueCard(question, answer, subject) {
    this.question = question;
    this.answer = answer;
    this.subject = subject;
}

const form = document.getElementById("qa-form");
const tbody = document.getElementById('cards-list');
let count = document.getElementById('count');
const filter = document.querySelector('.filter');
let filtered = [];

let clearAll = document.getElementById('delete-btn');

///UI Constructor
function CCFunctions() { }

const ccFunctions = new CCFunctions();

CCFunctions.prototype.update = function (node, tbody) {
    node.textContent = tbody;
}

CCFunctions.prototype.addCueCard = function (card) {
    const list = document.getElementById('cards-list');
    //create the row with the 4 <td> tags.
    const row = document.createElement('tr');

    row.innerHTML = `<td>${card.question}</td>
                    <td>${card.answer}</td>
                    <td>${card.subject}</td>
                    <td><a href="#" class="delete-icon">+</a></td>`

    list.appendChild(row);
    ccFunctions.update(count, tbody.children.length++);
}

CCFunctions.prototype.clearArgs = function () {
    document.getElementById('question').value = "";
    document.getElementById('answer').value = "";
    document.getElementById('subject').value = "";
}

CCFunctions.prototype.trimArgs = function () {
    document.getElementById('question').value =
        document.getElementById('question').value.trim();
    document.getElementById('answer').value =
        document.getElementById('answer').value.trim();
    document.getElementById('subject').value =
        document.getElementById('subject').value.trim();
}

CCFunctions.prototype.showAlert = function (msg, className) {

    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg.toUpperCase()));


    const container = document.querySelector('.container');
    container.insertBefore(div, form);

    setTimeout(function () {
        div.remove();
    }, 2000);
}

CCFunctions.prototype.filterCards = function (e) {
    console.log(e.target.value);
    let filteredCount = tbody.children.length;
    if (filter.value === "") {
        ccFunctions.update(count, tbody.children.length);

    }

    let filteredArr = filtered.map(function (tasks) {
        return tasks.includes(e.target.value.toLowerCase());
    })

    filteredArr.forEach(function (tasks, index) {
        if (tasks === false) {
            tbody.children[index].style.position = "absolute";
            tbody.children[index].style.top = "-9999px";
            tbody.children[index].style.left = "-9999px";
            filteredCount--;
        } else {
            tbody.children[index].style.position = "relative";
            tbody.children[index].style.top = "0";
            tbody.children[index].style.left = "0";
        }
        ccFunctions.update(count, filteredCount);
    })
}

CCFunctions.prototype.filterHelper = function () {
    let array = [];
    for (let i = 0; i < tbody.children.length; i++) {
        array.push(tbody.children[i].children[2].textContent.toLowerCase());
    }
    return array;
}

CCFunctions.prototype.deleteCard = function (e) {
    if (e.target.classList.contains('delete-icon')) {
        filtered.forEach(function (task, index) {
            if (e.target.parentElement.parentElement.children[2].textContent.toLowerCase() === task.toLowerCase()) {
                filtered.splice(index, 1);
            }
        })
        e.target.parentElement.parentElement.remove();
        ccFunctions.update(count, tbody.children.length);
    }
}

tbody.addEventListener("click", function (e) {
    ccFunctions.deleteCard(e);
})

filter.addEventListener("input", ccFunctions.filterCards)

clearAll.addEventListener("click", ccFunctions.allCardsGone);

CCFunctions.prototype.allCardsGone = function () {
    console.log('hi')
    while (tbody.firstChild) {
        tbody.firstChild.remove();
    }
    filtered = [];
}

//Event Listeners
form.addEventListener('submit', function (e) {

    //1. Create form values
    let question = document.getElementById('question').value,
        answer = document.getElementById('answer').value,
        subject = document.getElementById('subject').value;

    //trim spaces    
    ccFunctions.trimArgs();

    if (question.length === 0 || answer.length === 0 || subject.length === 0) {
        ccFunctions.showAlert('Error, missing arguments, fill them in!', 'error');
    } else {
        const card = new CueCard(question, answer, subject);
        //add cue cards to list
        ccFunctions.addCueCard(card);
        ccFunctions.showAlert('Success, the card has been created!', 'success');
    }
    filtered = ccFunctions.filterHelper();
    ccFunctions.clearArgs();
    e.preventDefault();
})

















