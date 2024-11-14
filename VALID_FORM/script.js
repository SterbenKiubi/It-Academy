// MY FORM
const myForm = document.getElementById('myForm');
// MY FORM'S COMPONENTS
const components = {
    developers: () => `<div id="developers-container">
        <label for="developersInput">Разработчики:</label>
        <input id="developersInput" type='text' name='DEVELOPERS' style='width: 453px'>
        <span id="developersErr"></span>
      </div>`,
    sitename: () => `<div id="sitename-container">
        <label for="sitenameInput">Название сайта:</label>
        <input id="sitenameInput" type='text' name='SITENAME' style='width: 453px'>
        <span id="sitenameErr"></span>
      </div>
      `,
    url: () => `<div id="url-container">
        <label for="url">URL сайта:</label>
        <input id="urlInput" type='text' name='URL' style='width: 300px'>
        <span id="urlErr"></span>
      </div>
      `,
    date: () => `<div id="date-container">
        <label for="date">Дата запуска сайта:</label>
        <input id="dateInput" type='date' name='STARTDATE' style='width: 80px'>
      </div>
      `,
    visitors: () => `<div id="visitors-container">
        <label for="visitors">Посетителей в сутки:</label>
        <input id="visitorsInput" type='visitors' name='VISITORS' style='width: 80px'>
      </div>
      `,
    email: () => `<div id="email-container">
        <label for="email">E-mail для связи:</label>
        <input id="emailInput" type='email' name='EMAIL' style='width: 200px'>
      </div>
      `,
    rubric: () => `<div id="rubric-container">
        <label for="rubric">Рубрика каталога:</label>
          <select  id="rubricSelect" name='RUBRIC'>
          <option value=1>здоровье</option>
          <option value=2>домашний уют</option>
          <option value=3 selected>бытовая техника</option>
          </select>
      </div>
      `,
    public: () => `<div id="public-container">
        <label for="public">Размещение:</label>
          <input type='radio' id="publicInputOne" name='PUBLIC' value=1><span class='SRadio8a'>бесплатное</span>
          <input type='radio' id="publicInputTwo" name='PUBLIC' value=2><span class='SRadio8a'>платное</span>
          <input type='radio' id="publicInputThree" name='PUBLIC' value=3><span class='SRadio8a'>VIP</span>
      </div>
      `,
    reviews: () => `<div id="reviews-container">
        <label for="reviewsCheckbox">Разрешить&nbsp;отзывы:</label>
        <input id="reviewsCheckbox" type='checkbox' name='comments'>
      </div>
      `,
    article: () => `<div id="article-container">
            <label for="article">Описание сайта:</label><br>
            <textarea id="article-textarea" name='article' style='width: 608px; height: 50px'></textarea>   
      </div><br>
      <input id="submit" type='submit' value='Опубликовать'>
      `
}

// RENDER
const render = () => {
    myForm.innerHTML = `
    ${components.developers()}
    ${components.sitename()}
    ${components.url()}
    ${components.date()}
    ${components.visitors()}
    ${components.email()}
    ${components.rubric()}
    ${components.public()}
    ${components.reviews()}
    ${components.article()}
    `  
}
render()

// CONSTANTS

const developersContainer = document.getElementById('developers-container');
const developersInput = document.getElementById('developersInput');
const developersErr = document.getElementById('developersErr');

const siteNameContainer = document.getElementById('sitename-container');
const siteNameInput = document.getElementById('sitenameInput');
const sitenameErr = document.getElementById('sitenameErr');

const urlContainer = document.getElementById('url-container');
const urlInput = document.getElementById('urlInput');
const urlErr = document.getElementById('urlErr');

const dateContainer = document.getElementById('date-container');
const dateInput = document.getElementById('dateInput');

const visitorsContainer = document.getElementById('visitors-container');
const visitorsInput = document.getElementById('visitorsInput')

const emailContainer = document.getElementById('email-container');
const emailInput = document.getElementById('emailInput');

const rubricContainer = document.getElementById('rubric-container');
const rubricSelect = document.getElementById('rubricSelect');

const publicContainer = document.getElementById('public-container');
const publicInputOne = document.getElementById('publicInputOne');
const publicInputTwo = document.getElementById('publicInputTwo');
const publicInputThree = document.getElementById('publicInputThree');

const reviewsContainer = document.getElementById('reviews-container');
const reviewsCheckbox = document.getElementById('reviewsCheckbox');

const articleContainer = document.getElementById('article-container');
const articleTextarea = document.getElementById('article-textarea');

const submitButton = document.getElementById('submit');

// EVENT LISTENERS
developersInput.addEventListener('blur', develoversValid);

function develoversValid() {
  let errFlag = false;

  if( !developersInput.value ) {
    developersErr.innerHTML = 'Поле не может быть пустым!';
    errFlag = true;
  } else {
    developersErr.innerHTML = '';
  }  
  return errFlag;
}

siteNameInput.addEventListener('blur', siteNameValid);

function siteNameValid() {
  let errFlag = false;

  if( !siteNameInput.value ) {
    sitenameErr.innerHTML = 'Поле не может быть пустым!';
    errFlag = true;
  } else {
    sitenameErr.innerHTML = '';
  }  
  return errFlag;
}

urlInput.addEventListener('blur', urlValid);

function urlValid() {
  let errFlag = false;
  if( !urlInput.value ) {
    urlErr.innerHTML = 'Поле не может быть пустым!';
    errFlag = true;
  } else {
    urlErr.innerHTML = '';
  }  
  return errFlag;
}

myForm.addEventListener('submit', formSubmit);

function formSubmit() {
  if ( develoversValid() || siteNameValid() || urlValid()) {
    event.preventDefault()
  }
}




















