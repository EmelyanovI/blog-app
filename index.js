const posts = [];

//Объявление переменных - Строковых констант
const TITLE_VALIDATION_LIMIT = 10;
const TITLE_VALIDATION_MIN_LIMIT = 5;
const TEXT_VALIDATION_LIMIT = 20;

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
    //получаем данные из поля ввода
    const postFromUser = getPostFromUser();
    //присвоение значения из поля ввода
    addPost(postFromUser);
    //отображение поста
    renderPosts();
    clearInput();//очистка полей ввода
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

    if (titleLen >= TITLE_VALIDATION_LIMIT) {
        validationMessageHeaderNode.innerHTML = `<div class="red__text" >
        Достигнут лимит символов ${titleLen}/${TITLE_VALIDATION_LIMIT}</div>`;
        return;
    };
};
validationText = () => {
    const textLen = postTextInputNode.value.length;
    
    //визуализация колличества символов
    validationMessageTextNode.innerText = `${textLen}/${TEXT_VALIDATION_LIMIT}`;

    if (textLen > TEXT_VALIDATION_LIMIT) {
        validationMessageTextNode.innerHTML = `<div class="red__text" >
        Лимит символов превышен ${textLen}/${TEXT_VALIDATION_LIMIT}</div>`;
        return;
    };
};

//получыем данные из поля ввода
getPostFromUser = () => {
    const title = postTitleInputNode.value

    if ( !title || title.length < 5) {
        alert('Заголовок не менее 5 символов');   
    };

    const text = postTextInputNode.value

    if ( !text || text.length < 10) {
        alert('Текст поста не менее 10 символов');   
    }
    return { //возвращаем объект состоящией из титла и текста
        title: title,
        text: text,
    };
};
const clearInput = () => {
    postTitleInputNode.value = '';
    postTextInputNode.value = '';
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