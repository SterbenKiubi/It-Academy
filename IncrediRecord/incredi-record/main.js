// ====== ЭДЕМЕНТЫ ======
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
  modal: {
    title: 'Log-In',
    backgroundImage: 'url(/img/close-button.png)',
    emailLabel: 'E-mail:',
    passwordLabel: 'Password:',
    submitButtonText: 'Login',
  },
  error: '',
  isLoading: false,
}

// ====== ФУНКЦИИ ======
const showModal = () => {
  const modal = createModal();
  document.body.appendChild(modal);
}


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
    appState.error = err.message;
  } finally {
    appState.isLoading = false;
  }

  console.log(JSON.stringify(appState.isLoading))
}

buttonLogin.addEventListener('click', showModal);

// ====== МОДАЛЬНОЕ ОКНО ======
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
  modalTitle.textContent = appState.modal.title;

  const modalCloseButton = document.createElement('button');
  modalCloseButton.id = 'modal-close';
  modalCloseButton.type = 'button';
  modalCloseButton.className = 'modal-close';
  modalCloseButton.style.backgroundImage = appState.modal.backgroundImage;
  modalCloseButton.style.backgroundSize = 'cover';
  modalCloseButton.style.width = '30px'
  modalCloseButton.style.height = '30px'
  modalCloseButton.style.border = '0';

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(modalCloseButton);

  const modalForm = document.createElement('form');
  modalForm.className = 'modal-form';

  const modalMain = document.createElement('div');
  modalMain.className = 'model-main';

  const emailLabel = document.createElement('label');
  emailLabel.setAttribute('for', 'e-mail');
  emailLabel.textContent = appState.modal.emailLabel;

  const emailInput = document.createElement('input');
  emailInput.name = 'e-mail';
  emailInput.type = 'text';
  emailInput.id = 'modal-login';

  const passwordLabel = document.createElement('label');
  passwordLabel.setAttribute('for', 'password');
  passwordLabel.textContent = appState.modal.passwordLabel;

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
  submitButton.textContent = appState.modal.submitButtonText;

  modalFooter.appendChild(submitButton);

  modalForm.appendChild(modalMain);
  modalForm.appendChild(modalFooter);

  modal.appendChild(modalHeader);
  modal.appendChild(modalForm);

  modalWrapper.appendChild(modal);

  appState.modal.isModalShown = true;

  return modalWrapper;
}

  
// ====== РЕНДЕР ======
const render = () => {
  headerTitle.innerHTML = appState.header.title;
  buttonLogin.innerHTML = appState.header.logIn;
  buttonSignin.innerHTML = appState.header.signIn;

  footer.innerHTML = appState.footer.author;

  // const modal = createModal();
  // document.body.appendChild(modal);
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