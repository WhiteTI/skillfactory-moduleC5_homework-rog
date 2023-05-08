const input1 = document.querySelector('#num1'),
    input2 = document.querySelector('#num2'),
    btn = document.querySelector('button'),
    block = document.querySelector('.img');

let cards = '';

function numCheck(num1, num2) {
    if ((num1 >= 100 && num1 <= 300) && (num2 >= 100 && num2 <= 300)) {
        useRequest(num1, num2, displayResult);
    } else {
        block.innerHTML = `<h3>Одно из чисел вне диапазона от 100 до 300</h3>`;
        setTimeout(function() {
            block.innerHTML = ``;
        }, 2000);
    }
    
}

function useRequest(num1, num2, callback) {
    fetch(`https://picsum.photos/${num1}/${num2}`)
    .then((response) => {
        const result = response.url;
        callback(result);
    })
    .catch(() => { console.log('error'); });
}

function displayResult(url) {

    const cardBlock = `
    <div class="card">
        <img
        src="${url}"
        class="card-image"
        />
    </div>
    `;
    cards = cards + cardBlock;
            
    block.innerHTML = cards;
}

btn.addEventListener('click', (event) => {
    event.preventDefault();
    numCheck(input1.value, input2.value);

    input1.value = '';
    input2.value = '';
});