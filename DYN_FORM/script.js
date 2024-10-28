// APP STATE
const formDef1=
[
  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  {label:'E-mail для связи:',kind:'shorttext',name:'email'},
  {label:'Рубрика каталога:',kind:'dropdown',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
  {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
  {label:'Разрешить отзывы:',kind:'check',name:'votes'},
  {label:'Описание сайта:',kind:'memo',name:'description'},
  {caption:'Опубликовать',kind:'submit'},
];

const formDef2=
[
  {label:'Фамилия:',kind:'longtext',name:'lastname'},
  {label:'Имя:',kind:'longtext',name:'firstname'},
  {label:'Отчество:',kind:'longtext',name:'secondname'},
  {label:'Возраст:',kind:'number',name:'age'},
  {caption:'Зарегистрироваться',kind:'submit'},
];

// COMPOTENTS
const components= {
    webSiteName: () => `
    <div class="form-div">
                <p>${formDef1[0].label}</p>
            <input type="text" style="width: 453px;">
            </div>`,
    webSiteUrl: () => `
    <div class="form-div">
                <p>${formDef1[1].label}</p>
            <input type="text" style="width: 453px;">
            </div>`,
    visitorsPerDay: () => `
    <div class="form-div">
                <p>${formDef1[2].label}</p>
            <input type="text" style="width: 80px;">
            </div>`,
    email: () => `
    <div class="form-div">
                <p>${formDef1[3].label}</p>
            <input type="text" style="width: 200px;">
            </div>`,
    rubric: () => `
    <div class="form-div">
                <p>${formDef1[4].label}</p>
            <select name="rubric" id="rubric" style="width: 204px;">
                <option value="${formDef1[4].variants[0].value}">${formDef1[4].variants[0].text}</option>
                <option value="${formDef1[4].variants[1].value}">${formDef1[4].variants[1].text}</option>
                <option value="${formDef1[4].variants[2].value}" selected>${formDef1[4].variants[2].text}</option>
            </select>
            </div>`,
    location: () => `
    <div class="form-div">
                <p>${formDef1[5].label}</p>
            <input type="radio" value="${formDef1[5].variants[0].value}"><span>${formDef1[5].variants[0].text}</span>
            <input type="radio" value="${formDef1[5].variants[1].value}"><span>${formDef1[5].variants[1].text}</span>
            <input type="radio" value="${formDef1[5].variants[2].value}"><span>${formDef1[5].variants[2].text}</span>
            </div>`,
    votes: () => `
    <div class="form-div">
                <p>${formDef1[6].label}</p>
            <input type="checkbox" checked>
            </div>`,
    description: () => `
    <div class="form-div form-div-description">
                <p>${formDef1[7].label}</p>
                <textarea name='article' style='width: 608px; height: 50px'></textarea>
                <input type='submit' value='${formDef1[8].caption}' style="width: 100px;">
            </div>`,
    surname: () => `
    <div class="form-div">
                <p>${formDef2[0].label}</p>
            <input type="text" style="width: 453px;">
            </div>`,
    name: () => `
    <div class="form-div">
                <p>${formDef2[1].label}</p>
            <input type="text" style="width: 453px;">
            </div>`,
    patronymic: () => `
    <div class="form-div">
                <p>${formDef2[2].label}</p>
            <input type="text" style="width: 453px;">
            </div>`,
    age: () => `
    <div class="form-div">
                <p>${formDef2[3].label}</p>
            <input type="text" style="width: 80px;">
            </div>`,
    registration: () => `
    <div class="form-div">
                <input type="submit" value="${formDef2[4].caption}">
            </div>`
}

// RENDER
const render = () => {
    const root = document.querySelector('#root-container');

    root.innerHTML = `
    <form method='POST' action="https://fe.it-academy.by/TestForm.php">
    ${components.webSiteName()}
    ${components.webSiteUrl()}
    ${components.visitorsPerDay()}
    ${components.email()}
    ${components.rubric()}
    ${components.location()}
    ${components.votes()}
    ${components.description()}
    </form>
    <hr style='margin: 15px 0 15px 0'>
    <form method='POST' action="https://fe.it-academy.by/TestForm.php">
    ${components.surname()}
    ${components.name()}
    ${components.patronymic()}
    ${components.age()}
    ${components.registration()}
    </form>`;

}
render()