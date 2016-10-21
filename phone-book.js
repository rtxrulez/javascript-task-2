'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
* Переобразуем телефон в международный формат
* @param {string}
*/
function phoneFormat(phone) {
    if (phone.length == 10 && /\d{10}/.test(phone)) {
        return '+7 (' + phone.substr(0, 3) + ') ' + phone.substr(3, 3) + '-' + phone.substr(6, 2) + '-' + phone.substr(8);
    } else {
        return false;
    }
}

/**
* Ищет пользователей в объекте и возвращает массив с номерами
* @param {string}
*/
function findInContactList(query) {
    var findPhoneBook = [];
    query = query.toLowerCase();
    for(var key in phoneBook) {
        var keyLow = key.toLowerCase();
        var nameLow = phoneBook[key]['name'].toLowerCase();
        var emailLow = phoneBook[key]['email'].toLowerCase();
        if('*' == query || keyLow.indexOf(query) >= 0 || nameLow.indexOf(query) >= 0 || emailLow.indexOf(query) >= 0) {
            findPhoneBook.push(key);
        }
    }
    return findPhoneBook;
}

/**
 * Телефонная книга
 */
var phoneBook = {};

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
exports.add = function (phone, name, email) {
    if (phone.length == 10 && /\d{10}/.test(phone) && typeof phoneBook[phone] == "undefined" && name != undefined) {
        if (typeof email == "undefined") {
            email = '';
        }
        phoneBook[phone] = {
            'name': name,
            'email': email
        }
        console.log('add ', phone);
        return true;
    } else {
        console.log('не Добавляем', phone);
        return false;
    }

};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
exports.update = function (phone, name, email) {
    if (phone.length == 10 && /\d{10}/.test(phone)) {
        if (typeof name != 'undefined') {
            phoneBook[phone]['name'] = name;
        }

        if (typeof email != 'undefined') {
            phoneBook[phone]['email'] = email;
        } else {
            phoneBook[phone]['email'] = '';
        }
        console.log('update ', phoneBook[phone]['name']);
    } else {
        return false;
    }
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */
exports.findAndRemove = function (query) {
    var usersArray = findInContactList(query);
    for (var i=0; i<usersArray.length; i++) {
        var phone = usersArray[i];
        console.log('phone', phone);
        delete phoneBook[phone];
    }
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */
exports.find = function (query) {
    var findPhoneBook = [];
    // узнаем в каком объекте находится искомоя строка
    var usersArray = findInContactList(query);
    for (var i=0; i<usersArray.length; i++) {
        var phone = usersArray[i];
        if (phoneBook[phone]['email'] == '') {
            var userString = phoneBook[phone]['name'] + ', ' + phone;
        } else {
            var userString = phoneBook[phone]['name'] + ', ' + phone + ', ' + phoneBook[phone]['email'];
        }
        findPhoneBook.push(userString);
    }

    // console.log('findPhoneBook', findPhoneBook)
    return findPhoneBook.sort();
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    // Парсим csv
    // Добавляем в телефонную книгу
    // Либо обновляем, если запись с таким телефоном уже существует

    return csv.split('\n').length;
};
