const input1 = document.querySelector('#num1'),
    input2 = document.querySelector('#num2'),
    btn = document.querySelector('button'),
    block = document.querySelector('.img');

const myJSON = localStorage.getItem('myJSON');

function numCheck(num1, num2) {
    if ((num1 < 1 || num1 > 10) && (num2 < 1 || num2 > 10)) {
        block.innerHTML = `<h3>Номер страницы и лимит вне диапазона от 1 до 10</h3>`;
        setTimeout(function() {
            block.innerHTML = ``;
            if (myJSON) {
                displayResult(JSON.parse(myJSON));
            }
        }, 2000);
    } else if (num1 < 1 || num1 > 10) {
        block.innerHTML = `<h3>Номер страницы вне диапазона от 1 до 10</h3>`;
        setTimeout(function() {
            block.innerHTML = ``;
            if (myJSON) {
                displayResult(JSON.parse(myJSON));
            }
        }, 2000);
    } else if (num2 < 1 || num2 > 10) {
        block.innerHTML = `<h3>Лимит вне диапазона от 1 до 10</h3>`;
        setTimeout(function() {
            block.innerHTML = ``;
            if (myJSON) {
                displayResult(JSON.parse(myJSON));
            }
        }, 2000);
    } else {
        useRequest(num1, num2, displayResult);
    }
    
}

function useRequest(num1, num2, callback) {
    fetch(`https://picsum.photos/v2/list?page=${num1}&limit=${num2}`)
    .then((response) => {
        const result = response.json();
        return result;
    })
    .then((data) => {
        callback(data);
        localStorage.setItem('myJSON', JSON.stringify(data));
    })
    .catch(() => { console.log('error'); });
}

function displayResult(apiData) {

    let cards = '';

    apiData.forEach(item => {
        const cardBlock = `
        <div class="card">
            <img
            src="${item.download_url}"
            class="card-image"
            />
            <p>${item.author}</p>
        </div>
        `;
        cards = cards + cardBlock;
    });
            
    block.innerHTML = cards;
}

btn.addEventListener('click', (event) => {
    event.preventDefault();
    numCheck(input1.value, input2.value);

    input1.value = '';
    input2.value = '';
});

if (myJSON) {
    displayResult(JSON.parse(myJSON));
}