'use strict';
var MyModyleFunction = (function () {

    const fs = require('fs');
    const postJson = fs.readFileSync('D:/Moment/server/data/posts.json');
    var posts =[];
    posts = JSON.parse(postJson);
    function formatDate(date) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }
    function compareDate(a, b) {
        return a.createdAt - b.createdAt;
    }
    function getAuthors(){
        let name = [];
        posts.forEach(function(item){
            if (!item.isDelete) {
                name.push(item.author);
            }
        })
        return unique(name);
    }
    function unique (arr) {
        const uniqeMarker = {};
        return arr.filter((item) => {
            if (!uniqeMarker[item]) {
                uniqeMarker[item] = true;
                return true;
            }
        });
    }
    function getPosts() {
        return posts;
    }

    function getHashtags() {
        let hashtags = [];
        posts.forEach(function (itemPost) {
            if(!itemPost.isDelete) {
                itemPost.hashTag.forEach(function (itemHashtag) {
                        hashtags.push(itemHashtag)
                    }
                )
            }
        });
        return unique(hashtags);
    }
    function getPhotoPosts(skip, top, filterConfig) {
        skip = skip || 0;
        top = top || 0;
        if(!posts){
            return null;
        }
        var min = top;
        if(min > posts.length){
            min = posts.length;
        }
        var postDelNot = posts.filter(function (tmp) {
            if(!tmp.isDelete){
                return true;
            }
        });
        if (!filterConfig) {
            return postDelNot.sort(compareDate).slice(skip,min);
        }
        else {
            let result = postDelNot;
            if (filterConfig.author && filterConfig.author.length!==0) {
                result = result.filter(function (post) {
                    return post.author === filterConfig.author;
                })
            }
            if (filterConfig.createdAt && filterConfig.createdAt.toString().length!==0) {
                result = result.filter(function (post) {
                    return formatDate(post.createdAt ) === formatDate(filterConfig.createdAt);
                })
            }
            if (filterConfig.hashTag && filterConfig.hashTag.length!==0) {
                result = result.filter(function (post) {
                    for (let hashTag of post.hashTag) {
                        for (let hashTagSearch of [].concat(filterConfig.hashTag)) {
                            if (hashTag === hashTagSearch) {
                                return true;
                            }
                        }
                    }
                });
            }
            return result.sort(compareDate).slice(skip, min);
        }
    }
    function getPhotoPost(id) {

        let found = posts.find(function (element) {
            return element.id === id;
        });
    return found;
    }
    function validatePhotoPost(post) {
            post.createdAt = new Date(post.createdAt);
            if (typeof post.id !== "string" || typeof post.description !== "string"
                || typeof post.author !== "string" || typeof post.photoLink !== "string"
                || !(post.createdAt instanceof Date)) {
                return false
            }
            if(posts) {
                var check =true ;
                posts.forEach(function (item) {
                    if (item.id === post.id) {
                        check = false;
                    }
                });
                if(check === false){
                    return false
                }
            }
            if (post.description.length === 0 || post.description.length >= 200) {
                return false;
            }
            if (post.photoLink.length === 0) {
                return false;
            }
            if (!post.createdAt || post.createdAt.toString() === "Invalid Date") {
                return false;
            }
            if (post.author.length === 0 || !post.author) {
                return false;
            }
            return true;
        }

    function addPhotoPost(post) {
        if (validatePhotoPost(post)) {
            post.isDelete = false;

            posts.push(post);
            return true;
        }
        return false;
    }
    function removePhotoPostLabeled(id) {
        let post;
        for(var i=0;i<posts.length;i++){
            if(posts[i].id === id){
                post = posts[i];
            }
        }
        if(post ){
            console.log(post);
            post.isDelete = true;
            return true;
        }
        return false;
    }
    function editPhotoPost(id, object) {
        object.createAt = new Date(object.createAt);
        if(object.isDelete === 'true'){
            object.isDelete === true;
        }else{
            object.isDelete === false;
        }
        let post = posts.find(post => post.id === id);
        if(post && post.isDelete === false){
            if(object.description){
                post.description = object.description;
            }
            else {
                return false;
            }
            if(object.hashTag && object.hashTag.length!==0){
                post.hashTag = [].concat(object.hashTag);
            }
            if(object.photoLink && object.photoLink>0) {
                post.photoLink = object.photoLink;
            }
            return true;
        }
        else {
            return false;
        }
    }



    return {
        getPhotoPosts,
        getPhotoPost,
        validatePhotoPost,
        addPhotoPost,
        editPhotoPost,
        getPosts,
        removePhotoPostLabeled,
        getAuthors,
        getHashtags
    }
}());
module.exports = MyModyleFunction;
