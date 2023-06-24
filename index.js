let post = {
    time: '',
    title: '',
    text: '',
};

//Объвление переменных - ссылок на HTML элементы
const postTitleInputNode = document.getElementById('post__header')
const postTextInputNode = document.getElementById('post__text');
const newPostBtnNode = document.getElementById('new-post__btn')
const postsNode = document.getElementById('feed__posts');

//Привязка функции-обработчика к кнопкам
//привязка к кнопке опубликовать
newPostBtnNode.addEventListener('click', () => {
    //получаем данные из поля ввода
    const postFromUser = getPostFromUser();
    //присвоение значения из поля ввода
    setPost(postFromUser);
    //отображение поста
    renderPost();
});

//получыем данные из поля ввода
getPostFromUser = () => {
    const title = postTitleInputNode.value
    const text = postTextInputNode.value

    return { //возвращаем объект состоящией из титла и текста
        title: title,
        text: text,
    };
};
//сохраняем заголовок поста
setPost = (newPost) => {
    post = newPost;
};
getPost = () => {
    return post;
};
//отобразить постa
renderPost = () => {
    const post = getPost();

    console.log(getPost());
    const postHTML = `
    <h3 class="feed__title text-title-style">${post.title}</h3>
    <p class="feed__text text-style">${post.text}</p>`;

    postsNode.innerHTML = postHTML;
};