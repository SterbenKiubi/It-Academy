// Defaults
const defaultUser = {
  email: "unknow-user@js.com",
  address: {
    "zipcode": "unknow-user123456",
  },
};

const defaultPlayer = {
  sockets: [
    { type: 'socket', picSrc: '../img/empty-record.png' },
    { type: 'socket', picSrc: '../img/empty-record.png' },
    { type: 'socket', picSrc: '../img/empty-record.png' },
    { type: 'socket', picSrc: '../img/empty-record.png' },
    { type: 'socket', picSrc: '../img/empty-record.png' },
  ],
  samples: [
    { type: 'sample', picSrc: '../img/record-red.png', soundSrc: '../samples/1_lead_a.mp3' },
    { type: 'sample', picSrc: '../img/record-orange.png', soundSrc: '../samples/2_deux_a.mp3' },
    { type: 'sample', picSrc: '../img/record-yellow.png', soundSrc: '../samples/3_kosh_a.mp3' },
    { type: 'sample', picSrc: '../img/record-multicolored.png', soundSrc: '../samples/4_shpok_a.mp3' },
    { type: 'sample', picSrc: '../img/record-gray.png', soundSrc: '../samples/5_tom_a.mp3' },
  ],
};

// ====== УТИЛИТЫ =======
const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const clone = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
};

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
  player: deepClone(defaultPlayer),
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
    const alert = document.getElementById('alert-div');
    if (alert) {
      document.body.removeChild(alert);
    }
  }, time);
};

const loadingHandler = (event) => {
  const spinner = document.getElementById('spinner');
  spinner.style.left = `${event.clientX - 15}px`;
  spinner.style.top = `${event.clientY - 10}px`;
};

const createSpinner = () => {
  const spinnerWrapper = document.createElement('div');
  spinnerWrapper.className = 'spinner-wrapper';
  spinnerWrapper.id = 'spinner-wrapper';

  const spinner = document.createElement('div');
  spinner.style.position = 'absolute';
  spinner.style.left = '45%';
  spinner.style.top =  '50%';
  spinner.id = 'spinner';
  spinner.classList.add('spinner');

  spinnerWrapper.appendChild(spinner);

  return spinnerWrapper;
};

const showSpinner = () => {
  const spinner = createSpinner();

  document.body.appendChild(spinner);
  
  document.body.addEventListener('mousemove', loadingHandler);
};

const removeSpinner = () => {
  const spinner = document.getElementById('spinner-wrapper');

  if (spinner) {
    document.body.removeChild(spinner);
  }

  document.body.removeEventListener('mousemove', loadingHandler);
};

const validate = (email, password) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!emailRegex.test(email)) {
    throw new Error('Incorrect email format. Please try again with correct email');
  }

  if (!passwordRegex.test(password)) {
    throw new Error('Incorrect password format. Please try again with correct password format');
  }
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
  },
  savePlayer: (player) => {
    const playerJSON = JSON.stringify(player);
    localStorage.setItem(appState.user.email, playerJSON);
  },
  loadPlayer: () => {
    const playerJSON = localStorage.getItem(appState.user.email);
    const player = JSON.parse(playerJSON) || deepClone(defaultPlayer);

    return player;
  },
  saveUser: (user) => {
    const userJSON = JSON.stringify(user);
    sessionStorage.setItem('user', userJSON);
  },
  getUser: () => {
    const userJSON = sessionStorage.getItem('user');
    const user = JSON.parse(userJSON) || deepClone(defaultUser);

    return user;
  },
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
    validate(email, password);

    appState.isLoading = true;
    showSpinner();
    const usersFromDB = await userService.getUsers();
    const usersFromLS = userLocalService.getUsers();
    const users = [...usersFromDB, ...usersFromLS];

    const user = users.find((user) => {
      return user.email === email && user.address.zipcode === password;
    });

    if (user) {
      userLocalService.saveUser(user);
      const player = userLocalService.loadPlayer();

      appState.user = user;
      appState.error = '';
      appState.player = player;

      render();

      showSuccessAlert('Login Success');
    } else {
      throw new Error('Invalid email or password');
    }

    closeModal();
  } catch (err) {
    console.error(err);
    appState.error = err.message;

    showErrorAlert(err.message);
  } finally {
    appState.isLoading = false;
    removeSpinner();
    
    removeAlert(5000);
  }
};

const signinHandler = async (email, password) => {
  try {
    validate(email, password);

    appState.isLoading = true;
    showSpinner();

    const user = await userService.postUser(email, password);

    if (user) {
      userLocalService.saveUser(user);
      userLocalService.postUser(user);
      appState.user = user;
      appState.error = '';
      appState.player = deepClone(defaultPlayer);
      userLocalService.savePlayer(appState.player);

      render();

      showSuccessAlert('User created successfully');
    } else {
      throw new Error('User was not craeted');
    }

    closeModal();
  } catch (err) {
    console.error(err);
    appState.error = err.message;

    showErrorAlert(err.message);
  } finally {
    appState.isLoading = false;
    removeSpinner();

    removeAlert(5000);
  }
}
const modalClickHandler = (clickEvent) => {
  const { target: { id } } = clickEvent;

  if (clickEvent.target.closest('#modal-close')) {
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

// ====== МОДАЛЬНЫЕ ОКНА ======
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
};

const createSocket = (socketConfig, id) => {
  const { picSrc, type } = socketConfig;

  const imgElement = document.createElement('img');

  imgElement.id = `${type}-${id}`;
  imgElement.className = 'empty-socket';
  imgElement.src = picSrc;
  imgElement.alt = `socket-${id}`;
  imgElement.setAttribute(type, '');

  return imgElement;
};

const addSockets = () => {
  const socketsWrapper = document.getElementById('sockets-wrapper');
  socketsWrapper.innerHTML = '';

  appState.player.sockets.forEach((config, index) => {
    let element;

    if (config.type === 'socket') {
      element = createSocket(config, index);
    }
    if (config.type === 'sample') {
      element = createSample(config, index);
    }

    socketsWrapper.appendChild(element);
  });
};

const createSample = (sampleConfig, id) => {
  const { picSrc, type } = sampleConfig;

  const imgElement = document.createElement('img');

  imgElement.id = `${type}-${id}`;
  imgElement.className = 'sample';
  imgElement.src = picSrc;
  imgElement.alt = `sample-${id}`;
  imgElement.setAttribute(type, '');

  return imgElement;
};

const addSamles = () => {
  const samplesWrapper = document.getElementById('samples-wrapper');
  samplesWrapper.innerHTML = '';

  appState.player.samples.forEach((config, index) => {
    let element;

    if (config.type === 'socket') {
      element = createSocket(config, index);
    }
    if (config.type === 'sample') {
      element = createSample(config, index);
    }

    samplesWrapper.appendChild(element);
  });
};

const createAudio = (src) => {
  const audio = document.createElement('audio');

  audio.setAttribute('autoplay', '');
  audio.setAttribute('loop', '');

  const source = document.createElement('source');
  source.setAttribute('src', src);
  source.setAttribute('type', 'audio/mp3');

  audio.appendChild(source);

  return audio;
};

const playAudio = () => {
  const audioElements = document.getElementsByTagName('audio');
  Array.from(audioElements).forEach((element) => {
    document.body.removeChild(element);
  });

  appState.player.sockets.forEach((socket) => {
    if (socket.type === 'sample') {
      const audio = createAudio(socket.soundSrc);

      document.body.appendChild(audio);
    }
  });
};

const spinReconds = () => {
  const sockets = document.getElementById('sockets-wrapper').children;
  const samples = document.getElementById('samples-wrapper').children;
  
  Array.from(sockets).forEach((socket) => {
    if (socket.hasAttribute('sample')) {
      socket.classList.add('spin-around');
    }
  });
  Array.from(samples).forEach((sample) => {
    if (sample.hasAttribute('sample')) {
      sample.classList.remove('spin-around');
    }
  });
};

// ====== DRAG AND DROP ======
const switchSampleAndSocket = (sample, socket) => {
  const sampleParent = sample.parentNode;
  const socketParent = socket.parentNode;

  const sampleIndex = Array.from(sampleParent.children).findIndex((child) => child.id === sample.id);
  const socketIndex = Array.from(socketParent.children).findIndex((child) => child.id === socket.id);

  let samplesArray;
  let socketsArray;
  if (sampleParent.id === 'sockets-wrapper') {
    samplesArray = appState.player.sockets;
  } else {
    samplesArray = appState.player.samples;
  }
  if (socketParent.id === 'samples-wrapper') {
    socketsArray = appState.player.samples;
  } else {
    socketsArray = appState.player.sockets;
  }

  const temp = samplesArray[sampleIndex];
  samplesArray[sampleIndex] = socketsArray[socketIndex];
  socketsArray[socketIndex] = temp;

  const nextSample = sampleParent.children[sampleIndex + 1];
  const nextSocket = socketParent.children[socketIndex + 1];

  if (nextSocket) {
    socketParent.insertBefore(sample, nextSocket);
  } else {
    socketParent.appendChild(sample);
  }

  if (nextSample) {
    sampleParent.insertBefore(socket, nextSample);
  } else {
    sampleParent.appendChild(socket);
  }
};

let currentPicSrc;

const dragStart = (dragStartEvent) => {
  dragStartEvent.dataTransfer.setData('sample-id', dragStartEvent.target.id);
  currentPicSrc = dragStartEvent.target.src;
  dragStartEvent.target.src = '../img/empty-record.png';
};

const dragEnd = (dragEndEvent) => {
  dragEndEvent.target.src = currentPicSrc;
};

const dragOver = (dragOverEvent) => {
  dragOverEvent.preventDefault();
};

const dragDrop = (dragDropEvent) => {
  dragDropEvent.preventDefault();
  const sampleId = dragDropEvent.dataTransfer.getData('sample-id');

  const socket = dragDropEvent.target;
  const sample = document.getElementById(sampleId);
  sample.src = currentPicSrc;

  switchSampleAndSocket(sample, socket);
  userLocalService.savePlayer(appState.player);

  playAudio();
  spinReconds();
};

let touchedSample;
let touchedSampleClone;

const touchStart = (event) => {
  touchedSample = event.target;
  touchedSampleClone = touchedSample.cloneNode(false);
  touchedSample.src = '../img/empty-record.png';
  touchedSampleClone.style.position = 'absolute';
  document.body.appendChild(touchedSampleClone);
};

const touchMove = (event) => {
  const touch = event.touches[0];
  
  touchedSampleClone.style.left = touch.clientX - touchedSample.offsetWidth / 2 + 'px';
  touchedSampleClone.style.top = touch.clientY - touchedSample.offsetHeight / 2 + 'px';
};

const touchEnd = (event) => {
  const touch = event.changedTouches[0];
  document.body.removeChild(touchedSampleClone);
  const targetSocket = document.elementFromPoint(touch.clientX, touch.clientY);

  touchedSample.src = touchedSampleClone.src;
  if (targetSocket.id.includes('socket')) {
    switchSampleAndSocket(touchedSample, targetSocket);
    userLocalService.savePlayer(appState.player);

    playAudio();
    spinReconds();
  }
};

const addPlayerListeners = () => {
  const sockets = document.querySelectorAll('[socket]');
  const samples = document.querySelectorAll('[sample]');

  sockets.forEach((socket) => {
    socket.addEventListener('dragover', dragOver);
    socket.addEventListener('drop', dragDrop);
  });

  samples.forEach((sample) => {
    sample.addEventListener('dragstart', dragStart);
    sample.addEventListener('dragend', dragEnd);
    sample.addEventListener('touchstart', touchStart);
    sample.addEventListener('touchmove', touchMove);
    sample.addEventListener('touchend', touchEnd);
  });
};
  
// ====== РЕНДЕР ======
function render() {
  const user = userLocalService.getUser();
  appState.user = user;
  const player = userLocalService.loadPlayer();
  appState.player = player;

  headerTitle.innerHTML = appState.header.title;
  buttonLogin.innerHTML = appState.header.logIn;
  buttonSignin.innerHTML = appState.header.signIn;

  footer.innerHTML = appState.footer.author;

  addSockets();
  addSamles();
  addPlayerListeners();

  playAudio();
  spinReconds();
}
render();
