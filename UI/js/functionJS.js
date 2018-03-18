"use strict";
var MyModyleFunction = (function () {

    var photoPosts =  [
        {
            id: '1',
            description: 'Главный на дворе',
            createdAt: new Date('2018-09-23T23:00:00'),
            author: 'Petya',
            photoLink: 'img/1_8572f3cbc07c3a820d74b93b223.jpg',
            hashTag: ["#BMV","#GroveStreet"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '2',
            description: 'Зимняя пора',
            createdAt: new Date('2018-10-23T17:00:00'),
            author: 'vlad',
            photoLink: 'img/2f69edbfa54ce6d27b9ae403456a38d1.jpg',
            hashTag: ["#Winter", "#friends","#funny"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '3',
            description: 'Звезды вырастают с дворового футбола!!!',
            createdAt: new Date('2018-04-23T15:00:00'),
            author: 'Vasya',
            photoLink: 'img/727113a8b51a0fb366e88f870f2d816b.jpg',
            hashTag: ["#FutBall", "#Ronaldo","Street"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },


    ];

    function compareDate(a, b) {
        return a.createdAt - b.createdAt;
    }


    function getAuthor(){
        var name = [];
        photoPosts.forEach(function(item){
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

    function getHashtags() {
        var hashtags = [];
        photoPosts.forEach(function (itemPost) {
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
        var min = top;
        if(min > photoPosts.length){
            min = photoPosts.length;
        }
        var newArr = [];
        if (!filterConfig) {
            return photoPosts.sort(compareDate).slice(skip,min);
        }
        else {
            var result = photoPosts;
            if (filterConfig.author) {
                result = result.filter(function (post) {
                    return post.author === filterConfig.author;
                })
            }
            if (filterConfig.createdAt) {
                result = result.filter(function (post) {
                    return post.createdAt === filterConfig.createdAt;
                })
            }
            if (filterConfig.hashTag) {
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
        var found = photoPosts.find(function (element) {
            return element.id === id;
        });
        return found;
    }
    function validatePhotoPost(post,isForAddPost) {
        var isValidate = true;
        if (typeof post.id !== "string" || typeof post.description !== "string"
            || typeof post.author !== "string" || typeof post.photoLink !== "string"
            || !(post.createdAt instanceof Date) || !(post.hashTag instanceof Array)) {
            return false
        }
        photoPosts.forEach(function (item) {
            if (item.id === post.id) {
                return false;
            }
        });
        if (post.description.length === 0 || post.description.length >= 200) {
            return false;
        }
        if(post.photoLink.length === 0){
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
            photoPosts.push(post);
            return true;
        }
        return false;
    }
    function removePhotoPostLabeled(id) {
        var found = photoPosts.findIndex(i => i.id === id);
        photoPosts[found].isDelete = true;
    }
    function editPhotoPost(id, object) {
        var found = photoPosts.findIndex(i => i.id === id);
        if(found!== -1){
            if(object.description && object.description){
                photoPosts[found].description = object.description;
            }
            if(object.hashTag && object.hashTag.length!==0){
                photoPosts[found].hashTag = [];
                photoPosts[found].hashTag.concat(object.hashTag);
            }
            if(object.photoLink && object.photoLink!==0) {
                photoPosts[found].photoLink = object.photoLink;
            }
        }
    }

    return {
        getPhotoPosts,
        getPhotoPost,
        validatePhotoPost,
        addPhotoPost,
        editPhotoPost,
        removePhotoPostLabeled,
        getAuthor,
        getHashtags
    }
}());