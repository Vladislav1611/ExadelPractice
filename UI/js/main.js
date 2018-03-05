'strict mode';

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

function getPhotoPost(num) {
    debugger;
    let tmp = [];
    photoPosts.forEach(function (post) {
        if (post.id === num) {
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

function  validatePhotoPost(id, description, createdAt, author, photoLink) {
    debugger;
    if (typeof  id === 'string' && typeof description === 'string' && createdAt instanceof Date && typeof author === 'string' && isUrlValid(photoLink)===true) {
        return true;
    }
    return false;
}
function isUrlValid(userInput) {
    var regexQuery = "^http(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$";
    var url = new RegExp(regexQuery,"g");
    if (url.test(userInput)) {
        alert('Great, you entered an E-Mail-address');
        return true;
    }
    return false;
}

function addPhotoPosts(id, description, createdAt, author, photoLink ) {
    debugger;
    if(validatePhotoPost(id, description, createdAt, author, photoLink )) {
        let item = {id: id, description: description, createdAt: createdAt, author: author, photoLink: photoLink};
        photoPosts.push(item);
        console.log(photoPosts);
        return true;
    }
    return false;
}

function removePhotoPost(num) {
    debugger;
    let tmp = [];
    for(let i=0;i<photoPosts.length;i++) {
        if(photoPosts[i].id !==num)
        {
            tmp.push(photoPosts[i]);
        }
    }
    return tmp;
}

function editPhotoPost(num, id, description, createdAt, author, photoLink){
    debugger;
    for(let i=0;i<photoPosts.length;i++) {
        if (photoPosts[i].id === num) {
            if (description !== undefined && photoLink !== undefined) {
                photoPosts[i].photoLink = photoLink;
                photoPosts[i].descriprion = description;
            }
            else if (description === undefined && photoLink !== undefined) {
                photoPosts[i].photoLink = photoLink;
            }
            else if (description !== undefined && photoLink === undefined) {
                photoPosts[i].descriprion = description;
            }
            else {
                console.log('Enter correct description and url photolink');
            }
            return true;
        }

    }
        console.log('PhotoPost with this id not exist')
    return false;
}






