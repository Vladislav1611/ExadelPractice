"use strict";
(function () {
    var user ="vlad"
    setProfile();
    function showPhotoPost(Post) {
        var posts =document.getElementById("posts");
        var pos = document.createElement("div");
        pos.className = "post";

        var headPost = document.createElement("div");
        headPost.className = "headPost";

        var inconUser = document.createElement("img");
        inconUser.className = "userPhoto";
        inconUser.setAttribute("src","img/user .png");

        var nickname = document.createElement('div');
        nickname.className = 'username';
        nickname.innerHTML = Post.author;

        var data = document.createElement('div');
        data.className = 'datapost';
        data.innerHTML = formatDate(Post.createdAt);

        headPost.appendChild(inconUser);
        headPost.appendChild(nickname);
        headPost.appendChild(data);

        var photoArea = document.createElement("div");
        photoArea.className = "photo";
        var photo = document.createElement("img");
        photo.setAttribute("src",Post.photoLink);
        photoArea.appendChild(photo);

        var elements = document.createElement("div");
        elements.className = "elements";

        var like = document.createElement("img");
        like.className = "like";
        like.setAttribute("src","img/heart-outline%20.png");
        var hashtegs = document.createElement("div");
        hashtegs.className = "hashtegs";
        var hashTags = "";
        Post.hashTag.forEach(function (item) {
            hashTags+= item + " ";
        });
        hashtegs.innerHTML = hashTags;
        if(user === Post.author)
        {
            var edit = document.createElement("img");
            edit.className = "setting";
            edit.setAttribute("src","img/setting.png");
            var deletePost = document.createElement("img");
            deletePost.className = "delete";
            deletePost.setAttribute("src","img/waste-bin.png");
            var comment = document.createElement("div");
            comment.innerHTML = "<textarea name=\"text\"  cols=\"109\" rows=\"4\"  placeholder=\"comments\" class=\"comment\" >"+Post.description+"</textarea>";
            elements.appendChild(deletePost);
            elements.appendChild(edit);
        }
        else {
        var comment = document.createElement("div");
        comment.innerHTML = "<textarea name=\"text\" readonly  cols=\"109\" rows=\"4\"  placeholder=comments class=\"comment\" >"+Post.description+"</textarea>";
        }

        elements.appendChild(like);
        elements.appendChild(hashtegs);
        pos.appendChild(headPost);
        pos.appendChild(photoArea);
        pos.appendChild(elements);
        pos.appendChild(comment);
        posts.appendChild(pos);
        addFilterAuthor();
        addFilterHashtags()
    }
    function setProfile() {
        if(user)
        {
            var nick = document.getElementById("nick");
            var nickname = document.getElementById("nickname");
            nickname.innerHTML = user;
            var photoUser = document.createElement("img");
            photoUser.setAttribute("src","img/smiling-happy-emoticon-face.png");
            photoUser.className = "profile";
            var exit = document.createElement("img");
            exit.setAttribute("src","img/forbidden-mark.png");
            exit.className = "Exit";
            nick.appendChild(photoUser);
            nick.appendChild(exit);
            nick.appendChild(nickname);
        }
    }
    function formatDate(date) {

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }
    function addFilterAuthor(){
        var Author = document.getElementById("Author");
        var nameAuthors = MyModyleFunction.getAuthor();
        var formDatalist = "";
        nameAuthors.forEach(function (item) {
            formDatalist += "<option>" + item + "</option>";
        });
        Author.innerHTML = formDatalist;
    }
    function addFilterHashtags(){
        var Hashtags = document.getElementById("hashtags");
        var nameHashtags = MyModyleFunction.getHashtags();
        var formDatalist = "";
        nameHashtags.forEach(function (item) {
            formDatalist += "<option>" + item + "</option>";
        });
        Hashtags.innerHTML = formDatalist;
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
        update();
        var photoPosts = MyModyleFunction.getPhotoPosts(skip,top,filterConfig);
        for (var i = 0; i < photoPosts.length; i++) {
            if(!photoPosts[i].isDelete)
                showPhotoPost(photoPosts[i]);
        }
    }
    function update(){
        var posts = document.getElementById("posts");
        posts.innerHTML = "";
    }
    showPosts(0,4);
    editPost("1", {description:"Тачка на прокачку"});
    //removePhotoPost("3");
    addPhotoPost({
        id: '10',
        description: 'Барселона - чемпион',
        createdAt: new Date('2018-04-23T15:00:00'),
        author: 'vlad',
        photoLink: 'img/barcelona-fc-wallpaper-18.jpg',
        hashTag: ["#Barca", "#Gold"],
        like: ["Vlad", "Petya"],
        isDelete: false
    });

return{
    showPhotoPost,
    showPosts,
    editPost,
    removePhotoPostLabeled,
    addPhotoPost,
    addFilterHashtags,
    addFilterAuthor
};

})();