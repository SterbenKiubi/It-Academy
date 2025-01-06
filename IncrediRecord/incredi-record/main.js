// Elements
const headerTitle = document.getElementById('header-title');
const footer = document.getElementById('footer');
const buttonLogin = document.getElementById('button-login');
const buttonSignin = document.getElementById('button-signin');

// ====== СТЕЙТ ======
const appState = {
  header: {
    title: 'IncrediRecord',
    logIn: 'Log-In',
    signIn: 'Sign-In',
  },
  footer: {
    author: 'made by Sterben'
  },
  service: {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    usersUrl: '/users',
  },
  error: '',
  isLoading: false,
}

// ====== ФУНКЦИИ ======


// Services
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

// Handlers
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
    appState.error = err.message;
  } finally {
    appState.isLoading = false;
  }

  console.log(JSON.stringify(appState.isLoading))
}

// MODAL
const createModal = () => {
  const modalWrapper = document.createElement('div');
  modalWrapper.id = 'modal-wrapper';
  modalWrapper.className = 'modal-wrapper';

  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.className = 'modal';

  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';

  const modalTitle = document.createElement('h3');
  modalTitle.className = 'modal-title';
  modalTitle.textContent = 'Log-In';

  const modalCloseButton = document.createElement('button');
  modalCloseButton.id = 'modal-close';
  modalCloseButton.type = 'button';
  modalCloseButton.className = 'modal-close';
  modalCloseButton.textContent = 'X';

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(modalCloseButton);

  const modalForm = document.createElement('form');
  modalForm.className = 'modal-form';

  const modalMain = document.createElement('div');
  modalMain.className = 'model-main';

  const emailLabel = document.createElement('label');
  emailLabel.setAttribute('for', 'e-mail');
  emailLabel.textContent = 'E-mail:';

  const emailInput = document.createElement('input');
  emailInput.name = 'e-mail';
  emailInput.type = 'text';
  emailInput.id = 'modal-login';

  const passwordLabel = document.createElement('label');
  passwordLabel.setAttribute('for', 'password');
  passwordLabel.textContent = 'Password:';

  const passwordInput = document.createElement('input');
  passwordInput.name = 'password';
  passwordInput.type = 'text';
  passwordInput.id = 'modal-password';

  modalMain.appendChild(emailLabel);
  modalMain.appendChild(emailInput);
  modalMain.appendChild(passwordLabel);
  modalMain.appendChild(passwordInput);

  const modalFooter = document.createElement('div');
  modalFooter.className = 'modal-footer';

  const submitButton = document.createElement('button');
  submitButton.id = 'modal-submit-button';
  submitButton.type = 'submit';
  submitButton.className = 'modal-submit-button';
  submitButton.textContent = 'LogIn';

  modalFooter.appendChild(submitButton);

  modalForm.appendChild(modalMain);
  modalForm.appendChild(modalFooter);

  modal.appendChild(modalHeader);
  modal.appendChild(modalForm);

  modalWrapper.appendChild(modal);

  return modalWrapper;
}

  
// ====== РЕНДЕР ======
const render = () => {
  headerTitle.innerHTML = appState.header.title;
  buttonLogin.innerHTML = appState.header.logIn;
  buttonSignin.innerHTML = appState.header.signIn;

  footer.innerHTML = appState.footer.author;

  const modal = createModal();
  document.body.appendChild(modal);
}
render();

  
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