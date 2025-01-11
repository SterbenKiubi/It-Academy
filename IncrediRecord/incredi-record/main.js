// ====== ЭДЕМЕНТЫ ======
const headerTitle = document.getElementById('header-title');
const footer = document.getElementById('footer');
const buttonLogin = document.getElementById('button-login');
const buttonSignin = document.getElementById('button-signin');
const contentWrapper = document.getElementById('content-wrapper');

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
  loadingMessage: 'Loading...',
}

// ====== ФУНКЦИИ ======
const createAlert = (type, message) => {
  let icon;
  let color;

  switch (type) {
    case 'success':
      icon = '✔️';
      break;
    case 'info': {
      icon = '(i)'
      color = 'blue'
    }
      break;
    case 'error': {
      icon = '❌'
      color = 'red'
    }
      break;
    default: {
      icon = ''
      color = 'grey'
    }
  }

  const alertDiv = document.createElement('div');
  alertDiv.id = 'alert-div';
  alertDiv.className = 'alert';
  alertDiv.style.color = color;

  const errorIcon = document.createElement('span');
  errorIcon.className = 'alert-icon';
  errorIcon.innerHTML = icon;

  alertDiv.appendChild(errorIcon);
  alertDiv.appendChild(document.createTextNode(message));

  return alertDiv;
}

const showSuccessAlert = (message) => {
  const alert = createAlert('success', message);
  
  document.body.appendChild(alert);
}

const showErrorAlert = (message) => {
  const alert = createAlert('error', message);
  
  document.body.appendChild(alert);
}

const removeAlert = (time) => {
  setTimeout(() => {
    const alertDiv = document.getElementById('alert-div');
    document.body.removeChild(alertDiv);
  }, time);
};

const createSpinner = () => {
  const spinner = document.createElement('div');
  spinner.style.position = 'absolute';
  spinner.style.left = '45%'
  spinner.style.top = '70%'
  spinner.id = 'spinner';
  spinner.classList.add('spinner');
  
  contentWrapper.appendChild(spinner)
}

const removeSpinner = () => {
  const spinner = document.getElementById('spinner')
  contentWrapper.removeChild(spinner)
}

const replaceEmptyRecordOneToFillingRecord = (src) => {
  const emmpyRecordOne = document.getElementById('empty-record-one');

  emmpyRecordOne.src = src;
  emmpyRecordOne.classList.add('spin-around')
}

const replaceEmptyRecordTwoToFillingRecord = (src) => {
  const emmpyRecordTwo = document.getElementById('empty-record-two');

  emmpyRecordTwo.src = src;
  emmpyRecordTwo.classList.add('spin-around')
}

const replaceEmptyRecordThreeToFillingRecord = (src) => {
  const emmpyRecordThree = document.getElementById('empty-record-three');

  emmpyRecordThree.src = src;
  emmpyRecordThree.classList.add('spin-around')
}

const replaceEmptyRecordFourToFillingRecord = (src) => {
  const emmpyRecordFour = document.getElementById('empty-record-four');

  emmpyRecordFour.src = src;
  emmpyRecordFour.classList.add('spin-around')
}

const replaceEmptyRecordFiveToFillingRecord = (src) => {
  const emmpyRecordFive = document.getElementById('empty-record-five');

  emmpyRecordFive.src = src;
  emmpyRecordFive.classList.add('spin-around')
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
    console.log(appState.loadingMessage);
    createSpinner()
    const usersFromDB = await userService.getUsers();
    const usersFromLS = userLocalService.getUsers();
    const users = [...usersFromDB, ...usersFromLS];

    const user = users.find((user) => {
      return user.email === email && user.address.zipcode === password;
    });

    if (user) {
      appState.user = user;
      appState.error = '';

      showSuccessAlert('Login Success');
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (err) {
    console.error(err);
    appState.error = err.message;

    showErrorAlert(err.message);
  } finally {
    appState.isLoading = false;
    removeSpinner()
    
    closeModal();
    removeAlert(5000);
  }
};

const signinHandler = async(email, password) => {
  try {
    appState.isLoading = true;
    createSpinner();
    const user = await userService.postUser(email, password);

    if (user) {
      userLocalService.postUser(user);
      appState.user = user;
      appState.error = '';

      showSuccessAlert('User created successfully');
    } else {
      throw new Error('User was not craeted');
    }
  } catch (err) {
    console.error(err);
    appState.error = err.message;

    showErrorAlert(err.message);
  } finally {
    appState.isLoading = false;
    removeSpinner()

    closeModal();
    removeAlert(5000);
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
}
render();

window.addEventListener('load', () => {
  const emptyRecordOne = document.getElementById('empty-record-one');
  const emptyRecordTwo = document.getElementById('empty-record-two');
  const emptyRecordThree = document.getElementById('empty-record-three');
  const emptyRecordFour = document.getElementById('empty-record-four');
  const emptyRecordFive = document.getElementById('empty-record-five');
  let selectedRecord = null;
  let offsetX = 0;
  let offsetY = 0;
  let zIndex = 1;

  const fillingRecords = document.querySelectorAll('.filling-record');

  const recordsLeftPositions = [];
  const recordsTopPositions = [];

  fillingRecords.forEach(record => {
    recordsLeftPositions.push(record.getBoundingClientRect().left);
    recordsTopPositions.push(record.getBoundingClientRect().top);
  })

  fillingRecords.forEach((record, index) => {
    record.style.position = 'absolute';

    record.style.left = `${recordsLeftPositions[index]}px`;
    record.style.top = `${recordsTopPositions[index]-50}px`;

    
    record.addEventListener('mousedown', (e) => {
      event.preventDefault();
      selectedRecord = record;

      zIndex += 1;
      selectedRecord.style.zIndex = zIndex;

      offsetX = e.clientX - record.getBoundingClientRect().left;
      offsetY = e.clientY - record.getBoundingClientRect().top;

      document.body.style.cursor = 'grab';
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  });

  function onMouseMove(e) {
    event.preventDefault();
    if(selectedRecord) {
      selectedRecord.style.left = (e.clientX - offsetX) + 'px';
      selectedRecord.style.top = (e.clientY - offsetY) + 'px';
    }
  }

  function onMouseUp() {
    event.preventDefault();
    let selectedRecordSrc = selectedRecord.src;
    
    
    if(selectedRecord) {
      
      document.body.style.cursor = 'default';
      const selectedRecordTop = selectedRecord.getBoundingClientRect().top;
      const selectedRecordRight = selectedRecord.getBoundingClientRect().right;
      const selectedRecordBottom = selectedRecord.getBoundingClientRect().bottom;
      const selectedRecordLeft = selectedRecord.getBoundingClientRect().left;
      
      const emptyRecordOneTop = emptyRecordOne.getBoundingClientRect().top;
      const emptyRecordOneRight = emptyRecordOne.getBoundingClientRect().right;
      const emptyRecordOneBottom = emptyRecordOne.getBoundingClientRect().bottom;
      const emptyRecordOneLeft = emptyRecordOne.getBoundingClientRect().left;

      const emptyRecordTwoTop = emptyRecordTwo.getBoundingClientRect().top;
      const emptyRecordTwoRight = emptyRecordTwo.getBoundingClientRect().right;
      const emptyRecordTwoBottom = emptyRecordTwo.getBoundingClientRect().bottom;
      const emptyRecordTwoLeft = emptyRecordTwo.getBoundingClientRect().left;

      const emptyRecordThreeTop = emptyRecordThree.getBoundingClientRect().top;
      const emptyRecordThreeRight = emptyRecordThree.getBoundingClientRect().right;
      const emptyRecordThreeBottom = emptyRecordThree.getBoundingClientRect().bottom;
      const emptyRecordThreeLeft = emptyRecordThree.getBoundingClientRect().left;

      const emptyRecordFourTop = emptyRecordFour.getBoundingClientRect().top;
      const emptyRecordFourRight = emptyRecordFour.getBoundingClientRect().right;
      const emptyRecordFourBottom = emptyRecordFour.getBoundingClientRect().bottom;
      const emptyRecordFourLeft = emptyRecordFour.getBoundingClientRect().left;

      const emptyRecordFiveTop = emptyRecordFive.getBoundingClientRect().top;
      const emptyRecordFiveRight = emptyRecordFive.getBoundingClientRect().right;
      const emptyRecordFiveBottom = emptyRecordFive.getBoundingClientRect().bottom;
      const emptyRecordFiveLeft = emptyRecordFive.getBoundingClientRect().left;

      console.log(selectedRecordLeft);
      console.log(emptyRecordOneLeft);
      console.log(selectedRecordSrc);
      
      
      
      if(selectedRecordTop >= emptyRecordOneTop &&
        selectedRecordRight <= emptyRecordOneRight &&
        selectedRecordBottom <= emptyRecordOneBottom &&
        selectedRecordLeft >= emptyRecordOneLeft
        ) {
        replaceEmptyRecordOneToFillingRecord(selectedRecordSrc)
      }

      if(selectedRecordTop >= emptyRecordTwoTop &&
        selectedRecordRight <= emptyRecordTwoRight &&
        selectedRecordBottom <= emptyRecordTwoBottom &&
        selectedRecordLeft >= emptyRecordTwoLeft
        ) {
          replaceEmptyRecordTwoToFillingRecord(selectedRecordSrc)
      }

      if(selectedRecordTop >= emptyRecordThreeTop &&
        selectedRecordRight <= emptyRecordThreeRight &&
        selectedRecordBottom <= emptyRecordThreeBottom &&
        selectedRecordLeft >= emptyRecordThreeLeft
        ) {
          replaceEmptyRecordThreeToFillingRecord(selectedRecordSrc)
      }

      if(selectedRecordTop >= emptyRecordFourTop &&
        selectedRecordRight <= emptyRecordFourRight &&
        selectedRecordBottom <= emptyRecordFourBottom &&
        selectedRecordLeft >= emptyRecordFourLeft
        ) {
          replaceEmptyRecordFourToFillingRecord(selectedRecordSrc)
      }

      if(selectedRecordTop >= emptyRecordFiveTop &&
        selectedRecordRight <= emptyRecordFiveRight &&
        selectedRecordBottom <= emptyRecordFiveBottom &&
        selectedRecordLeft >= emptyRecordFiveLeft
        ) {
          replaceEmptyRecordFiveToFillingRecord(selectedRecordSrc)
      }
      
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }

})


