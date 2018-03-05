'strict mode';
(function () {
    var photoPosts = [
        {
            id: '1',
            descriprion: 'test 1!!!',
            createdAt: new Date('2018-02-10T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg'
        },
        {
            id: '2',
            descriprion: 'test 2!!!',
            createdAt: new Date('2018-02-24T23:00:00'),
            author: '4 test',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg'
        },
        {
            id: '3',
            descriprion: 'test 3!!!',
            createdAt: new Date('2018-02-12T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg'
        },
        {
            id: '4',
            descriprion: 'test 4!!!',
            createdAt: new Date('2018-07-19T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg'
        },
        {
            id: '5',
            descriprion: 'test 4!!!',
            createdAt: new Date('2018-07-19T23:00:00'),
            author: '4 test',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg'
        },
        {
            id: '6',
            descriprion: 'test 4!!!',
            createdAt: new Date('2018-07-19T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg'
        }
    ];

//console.log(getPhotoPosts(3));
//console.log(getPhotoPost('5'));
//validatePhotoPost(4,'asdasdasd',new Date('2018-07-19T23:00:00'),'Иванов Иван','http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg');
//addPhotoPosts('7', 'lox', new Date('2018-02-10T23:00:00'), 'vlad', 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg');
//console.log('remove' + removePhotoPost('5'));
//editPhotoPost('3','3', 'lox', new Date('2018-02-10T23:00:00'), 'vlad', 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg')





    function getPhotoPosts(skip, top, filterConfig) {
        let tmp = [];
        if (filterConfig instanceof  Object && Object.keys(filterConfig).length < 2) {
            photoPosts.forEach( function (item) {
                if (item.author === filterConfig.author) {
                    tmp.push(item);
                }
            });
            if (tmp.length === 0) {
                tmp = photoPosts;
            }
            filterData(tmp);
        } else {
            tmp = photoPosts;
            filterData(tmp);
            alert ('You enter not valid data in filter config. Filter config have next structure: {author: "name_author"} ');
        }
        return skipTopFilter(skip, top, tmp);
    }
    function filterData(arr) {
        let dataFilterArray = arr;
        for (let i = 0; i < dataFilterArray.length-1; i++) {
            for (let j=0; j < dataFilterArray.length-1-i; j++){
                let tmp1 = dataFilterArray[j].createdAt.getTime();
                let tmp2 = dataFilterArray[j+1].createdAt.getTime();

                if (tmp2 < tmp1) {
                    let v = dataFilterArray[j+1];
                    dataFilterArray[j+1] = dataFilterArray[j];
                    dataFilterArray[j] = v;
                }
            }
        }
        return dataFilterArray;
    }
    function skipTopFilter(skip, top, array) {
        let finishArray = [];
        if ((skip === undefined && top === undefined)) {
            skip = 0;
            top = 10;
        }
        else if((skip === undefined && top !== undefined))
        {
            skip = 0;
        }
        else if((skip !== undefined && top === undefined))
        {
            top = 10;
        }
        if (skip < array.length) {
            if ( skip + top >= array.length) {
                for (let i = skip; i < array.length; i++) {
                    finishArray.push(array[i]);
                }
            } else {
                for (let i = skip; i < skip+top; i++) {
                    finishArray.push(array[i]);
                }
            }
        } else {
            finishArray = array;
            alert ('Skip not valid!!! You have array without filter with skip and top parameters');
        }

        return finishArray;
    }

    function getPhotoPost(id) {

        let tmp = [];
        photoPosts.forEach(function (post) {
            if (post.id === id) {
                tmp.push(post);
            }
        });
        if(tmp.length >0)
        {
            return tmp;
        }
        else {
            console.log('PhotoPost with this id not exist')
        }
    }

    function  validatePhotoPost(object) {

        if(typeof object.id !== "string" || typeof object.description !== "string"
            || typeof object.author !== "string" || typeof object.photoLink !== "string" || !(object.createdAt instanceof Date)){
            return false
        }
        for(let i = 0; i < photoPosts.length; i++){
            if(photoPosts[i].id === object.id){
                return false;
            }
        }
        if(object.description.length === 0 || object.description.length >= 200){
            return false;
        }
        if(object.createdAt === undefined || object.createdAt.toString() === "Invalid Date"){
            return false;
        }
        if(object.author === 0){
            return false;
        }
        return true;
    }


    function addPhotoPosts(object ) {
        if(validatePhotoPost(object )) {
            let item = {object};
            photoPosts.push(item);
            console.log(photoPosts);
            return true;
        }
        return false;
    }

    function removePhotoPost(id) {
        let tmp = [];
        for(let i=0;i<photoPosts.length;i++) {
            if(photoPosts[i].id !==id)
            {
                tmp.push(photoPosts[i]);
            }
        }
        return tmp;
    }

    function editPhotoPost(id,object) {
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






