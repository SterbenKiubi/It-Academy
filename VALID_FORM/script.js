const myForm = document.getElementById('myForm')
// COMPONENTS
const components = {
    developers: () => `<div id="developers-container">
        <label for="developersInput">Разработчики:</label>
        <input id="developersInput" type='text' name='DEVELOPERS' style='width: 453px'>
      </div>`,
    sitename: () => `<div id="sitename-container">
        <label for="sitenameInput">Название сайта:</label>
        <input id="sitenameInput" type='text' name='SITENAME' style='width: 453px'>
      </div>
      `,
    url: () => `<div id="url-container">
        <label for="url">URL сайта:</label>
        <input id="urlInput" type='text' name='URL' style='width: 300px'>
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

const siteNameContainer = document.getElementById('sitename-container');
const siteNameInput = document.getElementById('sitenameInput');

const urlContainer = document.getElementById('url-container');
const urlInput = document.getElementById('urlInput');

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

let errorMessage;

// ADD AND DELETE ERROR MESSAGE
const addErrorMessageAndFocusOnInput = (container, input) => {
  if(input == developersInput || input == siteNameInput || input == urlInput || input == emailInput) {
    errorMessage = 'Поле не должно быть пустым или содержать более 30-ти символов!'
  } else if (input == dateInput) {
    errorMessage = 'Вы не выбрали дату!'
  } else if (input == visitorsInput) {
    errorMessage = 'Введите действительное шестизначное число'
  } else if (input == rubricSelect) {
    errorMessage = 'Категория бытовая техника закрыта!'
  } else if (input == reviewsCheckbox) {
    errorMessage = 'Разрешите отзывы!'
  } else if (input == articleTextarea) {
    errorMessage = 'Опишите сайт!'
  } 
  
  const errorMessageTag = document.createElement('span');
  errorMessageTag.textContent = errorMessage;
  errorMessageTag.style.color = 'red';
  container.appendChild(errorMessageTag)
  // input.focus()
}
const removeErrorMessage = (container) => {
  container.removeChild(container.lastChild)
}

// LISTENERS
developersInput.addEventListener('blur', function() {
  if (developersInput.value.length > 30 || developersInput.value == '') {
    addErrorMessageAndFocusOnInput(developersContainer, developersInput);
  } else {
    removeErrorMessage(developersContainer)
  }
} );

siteNameInput.addEventListener('blur', function() {
  if (siteNameInput.value.length > 30 || siteNameInput.value == '') {
    addErrorMessageAndFocusOnInput(siteNameContainer, siteNameInput);
  } else {
    removeErrorMessage(siteNameContainer)
  }
} );

urlInput.addEventListener('blur', function() {
  if (urlInput.value.length > 30 || urlInput.value == '') {
    addErrorMessageAndFocusOnInput(urlContainer, urlInput);
  } else {
    removeErrorMessage(urlContainer)
  }
} );

visitorsInput.addEventListener('blur', function() {
  if (isNaN(visitorsInput.value) || visitorsInput.value == '' || visitorsInput.value.length > 6 ) {
    addErrorMessageAndFocusOnInput(visitorsContainer, visitorsInput);
  } else {
    removeErrorMessage(visitorsContainer)
  }
} );

emailInput.addEventListener('blur', function() {
  if (emailInput.value.length > 30 || emailInput.value == '') {
    addErrorMessageAndFocusOnInput(emailContainer, emailInput);
  } else {
    removeErrorMessage(emailContainer)
  }
} );

articleTextarea.addEventListener('blur', function() {
  if (articleTextarea.value.length > 30 || articleTextarea.value == '') {
    addErrorMessageAndFocusOnInput(articleContainer, articleTextarea);
  } else {
    removeErrorMessage(articleContainer)
  }
} );

submitButton.addEventListener('click', function() {
  event.preventDefault()
  if (dateInput.value == '') {
    addErrorMessageAndFocusOnInput(dateContainer, dateInput);
    console.log(publicInputOne.checked);
    console.log(publicContainer.childNodes);
    console.log(reviewsCheckbox.checked);
  } else {
    removeErrorMessage(dateContainer)
  }
  if (rubricSelect.value == 3) {
    addErrorMessageAndFocusOnInput(rubricContainer, rubricSelect);
  } else {
    removeErrorMessage(rubricContainer)
  }
  if (!(publicInputOne.checked)) {
    const errorMessageTag = document.createElement('span');
      errorMessageTag.textContent = 'У нас бесплатное размещение!';
      errorMessageTag.style.color = 'red';
      publicContainer.appendChild(errorMessageTag)
  } else {
      publicContainer.removeChild(publicContainer.lastChild)
  }
  if (!(reviewsCheckbox.checked)) {
    addErrorMessageAndFocusOnInput(reviewsContainer, reviewsCheckbox);
  } else {
    removeErrorMessage(reviewsContainer)
  }
  
});



















