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
    login: {
      title: 'Log-In',
      emailLabel: 'E-mail:',
      passwordLabel: 'Password:',
      submitButtonText: 'Login',
      isModalShown: false,
    },
    signin: {
      title: 'Sign-In',
      emailLabel: 'E-mail:',
      passwordLabel: 'Password:',
      submitButtonText: 'Create user',
      isModalShown: false,
    },
  },
  user: undefined,
  error: '',
  isLoading: false,
}

// ====== ФУНКЦИИ ======
const showSuccessfulAlert = () => {
  const alertContainer = document.getElementById('alert-container');
  
  const alertDiv = document.createElement('div');
  alertDiv.id = 'alert-div';
  alertDiv.className = 'alert';
  
  const checkIcon = document.createElement('span');
  checkIcon.className = 'alert-icon';
  checkIcon.innerHTML = '✔️'; 
  
  alertDiv.appendChild(checkIcon);
  alertDiv.appendChild(document.createTextNode('Here is a gentle confirmation that your action was successful.'));
  
  alertContainer.appendChild(alertDiv);
}

const showErrorAlert = () => {
  const alertContainer = document.getElementById('alert-container');

  const alertDiv = document.createElement('div');
  alertDiv.id = 'alert-div';
  alertDiv.className = 'alert';
  alertDiv.style.color = 'red';

  const errorIcon = document.createElement('span');
  errorIcon.className = 'alert-icon';
  errorIcon.innerHTML = '❌'; 

  alertDiv.appendChild(errorIcon);
  alertDiv.appendChild(document.createTextNode('You entered your username or password incorrectly. Please try again.'));

  alertContainer.appendChild(alertDiv);
}

const removeAlert = () => {
  const alertContainer = document.getElementById('alert-container');
  const alertDiv = document.getElementById('alert-div')

  alertContainer.removeChild(alertDiv);
}


// ====== СЕРВИСЫ ======
const getUsers = async () => {
  const { service: { baseUrl, usersUrl } } = appState;
  const url = baseUrl + usersUrl;
  
  const response = await fetch(url);
  const users = await response.json();

  return users;
};

const postUser = async (email, password) => {
  const { service: { baseUrl, usersUrl } } = appState;
  const url = baseUrl + usersUrl;
  
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      email,
      address: {
        zipcode: password,
      },
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  
  const user = await response.json();
  
  return user;
};

const userService = {
  getUsers,
  postUser,
};

const userLocalService = {
  postUser: (user) => {
    const usersFromLS = localStorage.getItem('incredy-record-users');
    const existedUsers = JSON.parse(usersFromLS) || [];

    const users = JSON.stringify([...existedUsers, user]);
    localStorage.setItem('incredy-record-users', users);
  },
  getUsers: () => {
    const usersFromLS = localStorage.getItem('incredy-record-users');
    const existedUsers = JSON.parse(usersFromLS) || [];

    return existedUsers;
  }
}

const closeModal = () => {
  const modal = document.getElementById('modal-wrapper');

  const modalEntries = Object.entries(appState.modal);
  modalEntries.forEach((entries) => {
    const modalName = entries[0];
    appState.modal[modalName].isModalShown = false
  });

  modal.removeEventListener('click', modalClickHandler);
  document.body.removeChild(modal);
}

// ====== ОБРАБОТЧИКИ ======
const loginHandler = async (email, password) => {
  try {
    appState.isLoading = true;
    const usersFromDB = await userService.getUsers();
    const usersFromLS = userLocalService.getUsers();
    const users = [...usersFromDB, ...usersFromLS];
    console.log(users);

    const user = users.find((user) => {
      return user.email === email && user.address.zipcode === password;
    });

    if (user) {
      appState.user = user;
      appState.error = '';
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (err) {
    console.error(err);
    appState.error = err.message;
  } finally {
    appState.isLoading = false;
    
    closeModal();
  }
};

const signinHandler = async(email, password) => {
  try {
    appState.isLoading = true;
    const user = await userService.postUser(email, password);

    if (user) {
      userLocalService.postUser(user);
      appState.user = user;
      appState.error = '';
    } else {
      throw new Error('User was not craeted');
    }
  } catch (err) {
    console.error(err);
    appState.error = err.message;
  } finally {
    appState.isLoading = false;

    closeModal();
  }
}
const modalClickHandler = (clickEvent) => {
  const { target: { id } } = clickEvent; 

  if (id === 'modal-close' ||
    id === 'modal-wrapper' ||
    id === 'modal-close-div-left' ||
    id === 'modal-close-div-right') {
    closeModal();
  }

  if (id === 'modal-submit-button') {
    clickEvent.preventDefault();
    const email = document.getElementById('modal-email').value;
    const password = document.getElementById('modal-password').value;

    const modalEntries = Object.entries(appState.modal);
    const modalEntry = modalEntries.filter((entries) => {
      const modalValue = entries[1];

      return modalValue.isModalShown;
    })[0];

    const modalName = modalEntry[0];

    if (modalName === 'login') {
      loginHandler(email, password);
    }

    if (modalName === 'signin') {
      signinHandler(email, password);
    }
    if(!email || !password) {
      showErrorAlert();
      setTimeout(removeAlert, 3000);
    }
    if(email && password) {
      showSuccessfulAlert()
      setTimeout(removeAlert, 3000);
    }
  }
}

const showLoginModal = () => {
  const modal = createModal(appState.modal.login);

  document.body.appendChild(modal);
  appState.modal.login.isModalShown = true;
  document.getElementById('modal-email').focus();

  modal.addEventListener('click', modalClickHandler);
};
const showSigninModal = () => {
  const modal = createModal(appState.modal.signin);

  document.body.appendChild(modal);
  appState.modal.signin.isModalShown = true;
  document.getElementById('modal-email').focus();

  modal.addEventListener('click', modalClickHandler);
};

buttonLogin.addEventListener('click', showLoginModal);
buttonSignin.addEventListener('click', showSigninModal);

// ====== МОДАЛЬНОЕ ОКНО ======
const createModal = (config) => {
  const {
    title,
    emailLabel: emailLabelValue,
    passwordLabel: passwordLabelValue,
    submitButtonText,
  } = config;

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
  modalTitle.textContent = title;

  const modalCloseButton = document.createElement('button');
  modalCloseButton.id = 'modal-close';
  modalCloseButton.type = 'button';
  modalCloseButton.className = 'modal-close';
  modalCloseButton.style.border = '1px solid black';
  modalCloseButton.style.borderRadius = '5px';

  const modalCloseDivLeft = document.createElement('div');
  modalCloseDivLeft.id = 'modal-close-icon-crosshair-one';
  modalCloseDivLeft.classList.add('modal-close-icon');
  modalCloseDivLeft.classList.add('modal-close-icon-crosshair-one');

  const modalCloseDivRiht = document.createElement('div');
  modalCloseDivRiht.id = 'modal-close-icon-crosshair-two';
  modalCloseDivRiht.classList.add('modal-close-icon');
  modalCloseDivRiht.classList.add('modal-close-icon-crosshair-two');
  
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(modalCloseButton);

  modalCloseButton.appendChild(modalCloseDivLeft);
  modalCloseButton.appendChild(modalCloseDivRiht);

  const modalForm = document.createElement('form');
  modalForm.className = 'modal-form';

  const modalMain = document.createElement('div');
  modalMain.className = 'model-main';

  const emailLabel = document.createElement('label');
  emailLabel.setAttribute('for', 'e-mail');
  emailLabel.textContent = emailLabelValue;

  const emailInput = document.createElement('input');
  emailInput.name = 'e-mail';
  emailInput.type = 'text';
  emailInput.id = 'modal-email';

  const passwordLabel = document.createElement('label');
  passwordLabel.setAttribute('for', 'password');
  passwordLabel.textContent = passwordLabelValue;

  const passwordInput = document.createElement('input');
  passwordInput.setAttribute('autocomplete', 'on');
  passwordInput.name = 'password';
  passwordInput.type = 'password';
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
  submitButton.textContent = submitButtonText;

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

  // const modal = createModal();
  // document.body.appendChild(modal);
}
render();
