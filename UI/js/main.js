'strict mode';
(function () {
        var photoPosts = [
            {
                id: '1',
                descriprion: 'test 1!!!',
                createdAt: new Date('2018-02-10T23:00:00'),
                author: 'Иванов Иван',
                photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
                hashTag: ["#Minsk", "#Famcs"],
                like: ["Vlad", "Andrew"],
            },
            {
                id: '2',
                descriprion: 'test 2!!!',
                createdAt: new Date('2018-02-24T23:00:00'),
                author: '4 test',
                photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
                hashTag: ["#Minsk", "#Famcs"],
                like: ["Vlad", "Andrew"],
            },
            {
                id: '3',
                descriprion: 'test 3!!!',
                createdAt: new Date('2018-02-12T23:00:00'),
                author: 'Иванов Иван',
                photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
                hashTag: ["#Minsk", "#Famcs"],
                like: ["Vlad", "Andrew"],
            },
            {
                id: '4',
                descriprion: 'test 4!!!',
                createdAt: new Date('2018-07-19T23:00:00'),
                author: 'Иванов Иван',
                photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
                hashTag: ["#Minsk", "#Famcs"],
                like: ["Vlad", "Ivan"],
            },
            {
                id: '5',
                descriprion: 'test 4!!!',
                createdAt: new Date('2018-07-19T23:00:00'),
                author: '4 test',
                photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
                hashTag: ["#Minsk", "#BNTY"],
                like: ["Vlad", "Andrew"],
            },
            {
                id: '6',
                descriprion: 'test 4!!!',
                createdAt: new Date('2018-07-19T23:00:00'),
                author: 'Иванов Иван',
                photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
                hashTag: ["#Minsk", "#Moscow"],
                like: ["Vlad", "Andrew"],
            }
        ];

        function compareDate(a, b) {
            return a.createdAt - b.createdAt;
        }

        function getPhotoPosts(skip, top, filterConfig) {
            skip = skip || 0;
            top = top || 0;
            var newArr = [];
            if (!filterConfig) {
                return photoPosts.slice(skip, skip + top).length
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
                            for (let jtem of [].concat(filterConfig.hashTag)) {
                                if (hashTag === jtem) {
                                    return true;
                                }
                            }
                        }
                    });
                }
                return result.sort(compareDate).slice(skip, top);
            }
        }

        function getPhotoPost(id) {
            var found = photoPosts.find(function (element) {
                return element.id === id;
            })
            return found;
        }

        function validatePhotoPost(post) {
            var isValidate = true;
            if (typeof post.id !== "string" || typeof post.description !== "string"
                || typeof post.author !== "string" || typeof post.photoLink !== "string"
                || !(post.createdAt instanceof Date) || !(post.hashTag instanceof Array)) {
                return false
            }
            for (var i = 0; i < photoPosts.length; i++) {
                if (photoPosts[i].id === post.id) {
                    return false;
                }
            }
            if (post.description.length === 0 || post.description.length >= 200) {
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
                console.log(post)
                if (!post.isDelete) {
                    post.isDelete = false;
                }
                photoPosts[photoPosts.length] = post;
                return true
            }
            return false
        }

        function removePhotoPost(id) {
            let tmp = [];
            for (let i = 0; i < photoPosts.length; i++) {
                if (photoPosts[i].id !== id) {
                    tmp.push(photoPosts[i]);
                }
            }
            return tmp;
        }

        function editPhotoPost(id, object) {
            for (let i = 0; i < photoPosts.length; i++) {
                if (photoPosts[i].id === id) {
                    var temp = photoPosts[i]
                    if (object.photoLink !== undefined) {
                        if (object.photoLink.length !== 0) {
                            temp.photoLink = object.photoLink
                        }
                        else {
                            return false;
                        }
                    }
                    if (object.description !== undefined) {
                        if (object.description.length === 0 || object.description.length >= 200) {
                            return false;
                        }
                        else {
                            temp.description = object.description
                        }
                    }
                    if (object.hashTag !== undefined) {
                        if (object.hashTag.length > 0) {
                            temp.hashTag = object.hashTag
                        }
                        else {
                            return false;
                        }
                    }
                    photoPosts[i] = temp
                    return true;
                }
            }
        }
})();






