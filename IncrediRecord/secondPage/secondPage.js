const article = document.getElementById('article');
const userNameWrapper = document.getElementById('userNameWrapper');
const userNameInput = document.getElementById('userNameInput');
const userNameButton = document.getElementById('enter-username-button');
const pageTitle = document.getElementById('pageTitle');
const settings = document.getElementById('settings');
const ruLang = document.getElementById('ru');
const engLang = document.getElementById('en');
const footer = document.getElementById('footer');

let userName;

// ====== СТЕЙТ ======
const appState = {
  header: {
      pageTitle: 'IncrediRecord',
      settings: 'Settings',
      language: {rus: 'ru', eng: 'eng'}
  },
  footer: {
      author: 'made by Sterben'
  },
  service: {
      baseUrl: 'https://jsonplaceholder.typicode.com',
      usersUrl: '/users',
  },
  errors: '',
  isLoading: false,
}

// ====== ФУНКЦИИ ======


// ====== СЕРВИСЫ ======
const getUsers = async () => {
  const { service: { baseUrl, usersUrl } } = appState;
  const url = baseUrl + usersUrl;
  
  const response = await fetch(url);
  const users = await response.json();

  return users;
}

const postUser = (req, res) => {}

const userService = {
  getUsers,
  postUser,
}

const removeUserNameWrapper = () => {
  article.removeChild(userNameWrapper)
}

// ====== ОБРАБОТЧИКИ ======
const userHandler = async () => {
  userName = userNameInput.value;
  console.log(userName);
  removeUserNameWrapper()
  
  try {
    appState.isLoading = true;
    console.log(JSON.stringify(appState.isLoading))
    const users = await userService.getUsers();
    console.log(users);
  } catch(err) {
    appState.errors = err.message;
  } finally {
    appState.isLoading = false;
  }

  console.log(JSON.stringify(appState.isLoading))
}

userNameButton.addEventListener('click', userHandler)

// ====== СЕРВИС ======
// fetch(appState.service.baseUrl + appState.service.usersUrl, {
//   method: 'POST',
//   body: JSON.stringify({
//     id: 1,
//     name: userName,
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));
  
  // ====== РЕНДЕР ======
  const render = () => {
    pageTitle.innerHTML = appState.header.pageTitle;
    settings.innerHTML = appState.header.settings;
    ruLang.innerHTML = appState.header.language.rus;
    engLang.innerHTML = appState.header.language.eng;
    footer.innerHTML = appState.footer.author
  }
  render()