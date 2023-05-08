const input = document.querySelector('input'),
    btn = document.querySelector('button'),
    block = document.querySelector('.img');

function numCheck(num) {
    if (num < 1  || num > 10) {
        block.innerHTML = `<h3>Число вне диапазона от 1 до 10</h3>`;
        setTimeout(function() {
            block.innerHTML = ``;
        }, 2000);
    } else {
        useRequest(num, displayResult);
    }
    
}

function useRequest(num, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `https://picsum.photos/v2/list?limit=${num}`, true);

    xhr.onload = function() {
        if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            
            if (callback) {
                callback(result);
            }
        }
    };

    xhr.onerror = function() {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    };

    xhr.send();
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
    numCheck(input.value);
    input.value = '';
});