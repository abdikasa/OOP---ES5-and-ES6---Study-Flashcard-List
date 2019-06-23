
//CueCard Constructor
//Creating the Cue Card

function CueCard(question, answer, subject) {
    this.question = question;
    this.answer = answer;
    this.subject = subject;
}

const form = document.getElementById("qa-form");


///UI Constructor

function CCFunctions() { }

CCFunctions.prototype.addCueCard = function (card) {
    const list = document.getElementById('cards-list');

    //create the row with the 4 <td> tags.
    const row = document.createElement('tr');

    row.innerHTML = `<td>${card.question}</td>
                    <td>${card.answer}</td>
                    <td>${card.subject}</td>
                    <td><a href="#" class="delete-icon">+</a></td>`

    list.appendChild(row);
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
    }, 4000);
}


//Event Listeners
form.addEventListener('submit', function (e) {

    //1. Crate form values
    let question = document.getElementById('question').value,
        answer = document.getElementById('answer').value,
        subject = document.getElementById('subject').value;
    const ccFunctions = new CCFunctions();

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

    ccFunctions.clearArgs();
    e.preventDefault();
})





//Add


//Delete