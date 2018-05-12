'use strict';
var functionDOM = (function () {
    var user ='vlad'
    setProfile();
    localStorage.clear()
    function showPhotoPost(userPost) {
       
        let posts =document.getElementById('posts');
        let post = document.createElement('div');
        post.className = 'post';

        let headPost = document.createElement('div');
        headPost.className = 'headPost';

        let inconUser = document.createElement("a");
        inconUser.setAttribute("href","#");
        inconUser.innerHTML="<img src=\"img/user%20.png\" alt=\"\"  class=\"userPhoto\">";

        let nickname = document.createElement('div');
        nickname.className = 'username';
        nickname.textContent = userPost.author;

        let data = document.createElement('div');
        data.className = 'datapost';
        data.textContent = formatDate(userPost.createdAt);

        headPost.appendChild(inconUser);
        headPost.appendChild(nickname);
        headPost.appendChild(data);

        let photoArea = document.createElement('div');
        photoArea.className = 'photo';
        let photo = document.createElement('img');
        photo.setAttribute('src',userPost.photoLink);
        photoArea.appendChild(photo);

        let elements = document.createElement('div');
        elements.className = 'elements';

        let like = document.createElement('a');
        like.setAttribute('href','#');
        like.innerHTML = "<img src=\"img/heart-outline%20.png\"  class=\"like\">";
        let hashtegs = document.createElement('div');
        hashtegs.className = 'hashtegs';
        let hashTags = '';
        hashTags = userPost.hashTag.join('');
        hashtegs.innerHTML  = hashTags;
        if(user === userPost.author)
        {
            let edit = document.createElement('a');
            edit.setAttribute('href','#');
            edit.innerHTML = "<img src=\"img/setting.png\" class=\"setting\">";
            let deletePost = document.createElement('a');
            deletePost.setAttribute('href','#');
            deletePost.innerHTML = "<img src=\"img/waste-bin.png.\" class=\"delete\">";
            var comment = document.createElement('div');
            comment.innerHTML  = "<textarea name=\'text\'  cols=\'109\' rows=\'4\'  placeholder=\'comments\' class=\'comment\' >"+userPost.description+"</textarea>";
            elements.appendChild(deletePost);
            elements.appendChild(edit);
        }
        else {
             comment = document.createElement('div');
        comment.innerHTML  = "<textarea name=\'text\' readonly  cols=\'109\' rows=\'4\'  placeholder=comments class=\'comment\' >"+userPost.description+"</textarea>";
        }
        elements.appendChild(like);
        elements.appendChild(hashtegs);
        post.appendChild(headPost);
        post.appendChild(photoArea);
        post.appendChild(elements);
        post.appendChild(comment);
        posts.appendChild(post);
    }

    function setProfile() {
        if(user)
        {


            let nick = document.getElementById('nick');
            let nickname = document.getElementById('nickname');
            nickname.textContent  = user;
            let photoUser = document.createElement('a');
            photoUser.setAttribute('href','#');
            photoUser.innerHTML = "<img src=\"img/smiling-happy-emoticon-face.png\" alt=\"Memories\" class=\"profile\">";
            let exit = document.createElement("a");
            exit.setAttribute('href','#');
            exit.innerHTML = "<img src=\"img/forbidden-mark.png\" alt=\"Exit\" class=\"Exit\">";
            nick.appendChild(photoUser);
            nick.appendChild(exit);
            nick.appendChild(nickname);
            addFilterAuthor();
            addFilterHashtags();
        }
    }
    function formatDate(date) {

        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }
    function addFilterAuthor(){
        let Author = document.getElementById('Author');
        let nameAuthors = MyModyleFunction.getAuthors();
        let formDatalist = '';
        nameAuthors.forEach(function (item) {
            formDatalist += '<option>' + item + '</option>';
        });
        Author.innerHTML = formDatalist;
    }
    function addFilterHashtags(){
        let Hashtags = document.getElementById('hashtags');
        let nameHashtags = MyModyleFunction.getHashtags();
        let formDatalist = '';
        nameHashtags.forEach(function (item) {
            formDatalist += '<option>' + item + '</option>';
        });
        Hashtags.innerHTML  = formDatalist;
    }
    function addPhotoPost(post) {
        MyModyleFunction.addPhotoPost(post);
        showPosts(0,10);
    }
    function removePhotoPost(id) {
        MyModyleFunction.removePhotoPostLabeled(id);
        showPosts(0,10);
    }
    function editPost(id,post) {
        MyModyleFunction.editPhotoPost(id, post);
        showPosts(0,10);
    }
    function showPosts(skip, top, filterConfig) {
        let posts = document.getElementById('posts');
        posts.textContent  = '';
        let photoPosts = MyModyleFunction.getPhotoPosts(skip,top,filterConfig);
        for (let i = 0; i < photoPosts.length; i++) {
            if(!photoPosts[i].isDelete)
                showPhotoPost(photoPosts[i]);
        }
    }


return{
    showPhotoPost,
    showPosts,
    editPost,
    removePhotoPost,
    addPhotoPost,
    addFilterHashtags,
    addFilterAuthor
};

})();
functionDOM.showPosts(0,4);

functionDOM.editPost('1', {description:'Тачка на прокачку'});

functionDOM.removePhotoPost('3');

functionDOM.addPhotoPost({
    id: '10',
    description: 'Барселона - чемпион',
    createdAt: new Date('2018-04-23T15:00:00'),
    author: 'vlad',
    photoLink: 'img/barcelona-fc-wallpaper-18.jpg',
    hashTag: ['#Barca', '#Gold'],
    like: ['Vlad', 'Petya'],
    isDelete: false
});