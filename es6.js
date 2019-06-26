//Create Class For CueCard

class CueCard {
    constructor(question, answer, subject) {
        this.question = question;
        this.answer = answer;
        this.subject = subject;
    }
}

//Create Class For the Interface's functions
//Same as ES5, they are stored in the prototype of the CCFunctions class.

class CCFunctions {
    update(node, tbody) {
        node.textContent = tbody;
    }
    addCueCard(card) {
        const list = document.getElementById('cards-list');
        //create the row with the 4 <td> tags.
        const ccFunctions = new CCFunctions();
        const row = document.createElement('tr');

        row.innerHTML = `<td>${card.question}</td>
                        <td>${card.answer}</td>
                        <td>${card.subject}</td>
                        <td><a href="#" class="delete-icon">+</a></td>`

        list.appendChild(row);
        ccFunctions.update(document.getElementById('count'), list.children.length);
    }

    clearArgs() {
        document.getElementById('question').value = "";
        document.getElementById('answer').value = "";
        document.getElementById('subject').value = "";
    }

    trimArgs() {
        document.getElementById('question').value =
            document.getElementById('question').value.trim();
        document.getElementById('answer').value =
            document.getElementById('answer').value.trim();
        document.getElementById('subject').value =
            document.getElementById('subject').value.trim();
    }

    showAlert(msg, className) {

        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(msg.toUpperCase()));


        const container = document.querySelector('.container');
        container.insertBefore(div, document.getElementById("qa-form"));

        setTimeout(function () {
            div.remove();
        }, 2000);
    }

    filterCards(e) {
        console.log(e.target.value);
        const ccFunctions = new CCFunctions();
        let filteredCount = document.getElementById('cards-list').children.length;
        if (document.querySelector('.filter').value === "") {
            ccFunctions.update(document.getElementById('count'), document.getElementById('cards-list').children.length);
        }

        let filtered = ccFunctions.filterHelper();

        let filteredArr = filtered.map(function (tasks) {
            return tasks.includes(e.target.value.toLowerCase());
        })

        filteredArr.forEach(function (tasks, index) {
            if (tasks === false) {
                document.getElementById('cards-list').children[index].style.position = "absolute";
                document.getElementById('cards-list').children[index].style.top = "-9999px";
                document.getElementById('cards-list').children[index].style.left = "-9999px";
                filteredCount--;
            } else {
                document.getElementById('cards-list').children[index].style.position = "relative";
                document.getElementById('cards-list').children[index].style.top = "0";
                document.getElementById('cards-list').children[index].style.left = "0";
            }
            ccFunctions.update(document.getElementById('count'), filteredCount);
        })
    }

    filterHelper() {
        let array = [];
        for (let i = 0; i < document.getElementById('cards-list').children.length; i++) {
            array.push(document.getElementById('cards-list').children[i].children[2].textContent.toLowerCase());
        }
        return array;
    }

    deleteCard(e) {
        const ccFunctions = new CCFunctions();
        let filtered = ccFunctions.filterHelper();
        if (e.target.classList.contains('delete-icon')) {
            filtered.forEach(function (task, index) {
                if (e.target.parentElement.parentElement.children[2].textContent.toLowerCase() === task.toLowerCase()) {
                    filtered.splice(index, 1);
                }
            })
            e.target.parentElement.parentElement.remove();
            ccFunctions.update(document.getElementById('count'), document.getElementById('cards-list').children.length);
            ccFunctions.showAlert('Card is Deleted', 'success')
        }
    }

    allCardsGone() {
        const ccFunctions = new CCFunctions();

        while (document.getElementById('cards-list').firstChild) {
            document.getElementById('cards-list').firstChild.remove();
        }
        ccFunctions.showAlert('All Cards Cleared', 'success')
        ccFunctions.update(document.getElementById('count'), document.getElementById('cards-list').children.length);
    }
}

class localStorageFunctions {
    static addToLS(card) {
        const cards = localStorageFunctions.retreiveFromLS();
        cards.push(card);
        localStorage.setItem('cards', JSON.stringify(cards));
    }

    static deleteFromLS(e) {
        let cards = localStorageFunctions.retreiveFromLS();
        cards.forEach(function(card, index){
            if(e.target.parentElement.previousElementSibling.textContent === card.subject){
                cards.splice(index, 1);
            }
        })
        localStorage.setItem('cards', JSON.stringify(cards));
    }

    static retreiveFromLS() {
        //Unlike var or let, you must specify a value for a const declaration.
        //const cards
        let cards;
        if (localStorage.getItem('cards') === null) {
            cards = [];
        } else {
            cards = JSON.parse(localStorage.getItem('cards'));
        }
        return cards;
    }

    static  displayCards() {
        //1. Get the cards, they are now in JSON form, the way we want it. 
        let cards = localStorageFunctions.retreiveFromLS();
        //Loop through it and add to the screen.
        cards.forEach(function(card){
            const ccFunctions = new CCFunctions();
            ccFunctions.addCueCard(card);
        })
    }
}


document.addEventListener("DOMContentLoaded", localStorageFunctions.displayCards);


//Event Listeners
document.getElementById('cards-list').addEventListener("click", function (e) {
    const ccFunctions = new CCFunctions();
    ccFunctions.deleteCard(e);
    localStorageFunctions.deleteFromLS(e);
})

document.querySelector('.filter').addEventListener("input", function (e) {
    const ccFunctions = new CCFunctions();
    ccFunctions.filterCards(e);
})

document.getElementById('delete-btn').addEventListener("click", function (e) {
    const ccFunctions = new CCFunctions();
    ccFunctions.allCardsGone();
});

document.getElementById("qa-form").addEventListener('submit', function (e) {
    const ccFunctions = new CCFunctions();

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
        localStorageFunctions.addToLS(card);
        ccFunctions.showAlert('Success, the card has been created!', 'success');
    }
    ccFunctions.clearArgs();
    e.preventDefault();
})
