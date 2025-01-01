AOS.init();
const buttonWrapper = document.getElementById('button-wrapper');
const clickButton = document.getElementById('click-button')
const pumpText = document.getElementById('pump-text');
const expierenceText = document.getElementById('expierence-text');
const headphonesImg = document.getElementById('headphones-img');


const showButton = () => {
    buttonWrapper.classList.remove('hidden');
    buttonWrapper.classList.add('button-show');
}
setTimeout(showButton, 7000)

const hidePumpAndShowExpierence = () => {
    pumpText.classList.add('hidden');
    expierenceText.classList.remove('hidden');
    expierenceText.classList.add('text-show')
}
setTimeout(hidePumpAndShowExpierence, 4000)

const showHeadphonesImg = () => {
    headphonesImg.classList.add('headphones-img-show')
}
setTimeout(showHeadphonesImg, 5500)

