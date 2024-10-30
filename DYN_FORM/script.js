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

const root = document.getElementById('root-container');

function createForm(formDef) {
    const form = document.createElement('form');
    form.action = 'https://fe.it-academy.by/TestForm.php';

    formDef.forEach(field => {
        if(field.label) {
            const label = document.createElement('label');
            label.textContent = field.label;
            form.appendChild(label);
        }
    

    let input;
    switch(field.kind) {
        case 'longtext':
        case 'number':
        case 'shorttext':
            input = document.createElement('input');
            input.type = field.kind === 'longtext' ? 'text' : field.kind;
            input.name = field.name;
            break;
        case 'dropdown':
            input = document.createElement('select');
            input.name = field.name;
            field.variants.forEach(variant => {
                const option = document.createElement('option');
                option.value = variant.value;
                option.text = variant.text;
                input.add(option);
                if(option.value == 3) {
                    option.selected = true;
                }
            })
            break;
        case 'radio':
            field.variants.forEach(variant => {
                const radioDiv = document.createElement('div');
                input = document.createElement('input');
                input.name = field.name;
                input.type = field.kind;
                const radioLabel = document.createElement('label');
                radioLabel.textContent = variant.text;
                radioLabel.prepend(input);
                radioDiv.appendChild(radioLabel);
                form.appendChild(radioDiv);
            })
            break;
        case 'check':
            input = document.createElement('input');
            input.type = 'checkbox';
            input.name = field.name;
            input.checked = true;
            break;
        case 'memo':
            input = document.createElement('textarea');
            input.name = field.name;
            break;
        case 'submit':
            input = document.createElement('input');
            input.type = field.kind;
            input.value = field.caption;
            break;
    }
if(input) {
    form.appendChild(input);
   }
if (field.kind !== 'radio') {
    form.appendChild(document.createElement('br'));
}
if(field.kind == 'submit') {
    const hr = document.createElement('hr');
    hr.style.marginTop = '15px';
    hr.style.marginBottom = '15px';
    form.appendChild(hr);
}
})

    root.appendChild(form);
}
createForm(formDef1)
createForm(formDef2)