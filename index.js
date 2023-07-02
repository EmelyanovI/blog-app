const posts = [];

//Объявление переменных - Строковых констант
const TITLE_VALIDATION_LIMIT = 30;
const TEXT_VALIDATION_LIMIT = 500;
const VALIDATION_MIN_LIMIT = 4;

//Объвление переменных - ссылок на HTML элементы
const postTitleInputNode = document.getElementById('post__header');
const postTextInputNode = document.getElementById('post__text');
const newPostBtnNode = document.getElementById('new-post__btn')
const postsNode = document.getElementById('feed__posts');
const resultHeaderNode = document.getElementById('result__header');
const resultTextNode = document.getElementById('result__text');

const validationMessageHeaderNode = document.getElementById('validation-post-header');
const validationMessageTextNode = document.getElementById('validation-post-text');

//Привязка функции-обработчика к кнопкам
//привязка к кнопке опубликовать
newPostBtnNode.addEventListener('click', () => {
    const postFromUser = getPostFromUser(); //получаем данные из поля ввода
    addPost(postFromUser);//присвоение значения из поля ввода
    renderPosts(); //отображение поста
    clearInput();//очистка полей ввода
    clearValidation();//очистка количества символов
});

//Проверка на количество символов в поле ввода
postTitleInputNode.addEventListener('input', () => {
    validationTitle();
});
postTextInputNode.addEventListener('input', () => {
    validationText();
});

validationTitle = () => {
    const titleLen = postTitleInputNode.value.length;
    //визуализация колличества символов
    validationMessageHeaderNode.innerText = `${titleLen}/${TITLE_VALIDATION_LIMIT}`;

    if (titleLen != 0 || titleLen > VALIDATION_MIN_LIMIT) {
        if (titleLen <= VALIDATION_MIN_LIMIT) {
            validationMessageHeaderNode.innerHTML = `<div class="red__text" >
            Нужно минимум ${VALIDATION_MIN_LIMIT + 1} символов:(</div>`;
        } else {
        };
        if (titleLen > TITLE_VALIDATION_LIMIT) {
            validationMessageHeaderNode.innerHTML = `<div class="red__text" >
            Лимит символов превышен на -${titleLen - TITLE_VALIDATION_LIMIT}</div>`;
            return;
        };
    } else {
        clearValidation();
    };

};
validationText = () => {
    const textLen = postTextInputNode.value.length;
    
    //визуализация колличества символов
    validationMessageTextNode.innerHTML = `${textLen}/${TEXT_VALIDATION_LIMIT}`;

    if (textLen != 0 || textLen > VALIDATION_MIN_LIMIT) {
        if (textLen <= VALIDATION_MIN_LIMIT) {
            validationMessageTextNode.innerHTML = `<div class="red__text" >
            Нужно минимум ${VALIDATION_MIN_LIMIT + 1} символов:(</div>`;
            newPostBtnNode.disabled = true;
            return;
        }
        if (textLen > TEXT_VALIDATION_LIMIT) {
            validationMessageTextNode.innerHTML = `<div class="red__text" >
            Лимит символов превышен ${textLen}/${TEXT_VALIDATION_LIMIT}</div>`;
            newPostBtnNode.disabled = true;
            return;
        } else {
            newPostBtnNode.disabled = false;
        };
    } else {
        clearValidation();
    };
};

//получыем данные из поля ввода
const getPostFromUser = () => {
    const title = postTitleInputNode.value
    const text = postTextInputNode.value

    //проверка на минимум символов
    if (!title || !text || title.length <= VALIDATION_MIN_LIMIT || text.length <= VALIDATION_MIN_LIMIT) {
        alert(`Заголовок и текст должны быть длинее ${VALIDATION_MIN_LIMIT + 1} символов`);
        return;
      }
    return { //возвращаем объект состоящией из титла и текста
        title: title,
        text: text,
    };
};
const clearInput = () => {//чистим поле ввода
    postTitleInputNode.value = '';
    postTextInputNode.value = '';
};
const clearValidation = () =>{//чистим счетчик символов
    validationMessageHeaderNode.innerText = '';
    validationMessageTextNode.innerText = '';
};
//добавление поста в массив
addPost = ({title, text}) => {
    const currentDate = new Date();

    const createdDate = currentDate
    .toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(/ г\.$/, "");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const createdTime = `${currentDate.getHours()}:${minutes}`;
    const createdDateTime = `${createdDate} ${createdTime}`;

    posts.push({
        title: title,
        text: text,
        created: createdDateTime
    });
};
//получаем пост
getPosts = () => {
    return posts;
};
//вывод постa
renderPosts = () => {
    const posts = getPosts();

    let postsHTML = '';

    posts.forEach(post => {
        postsHTML += `
        <time class="feed__time">${post.created}</time>
        <h3 class="feed__title">${post.title}</h3>
        <p class="feed__text">${post.text}</p>`
    });

    postsNode.innerHTML = postsHTML;
};