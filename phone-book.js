'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

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

};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */
exports.find = function (query) {
    var findPhoneBook = {};
    query = query.toLowerCase();
    for(var key in phoneBook) {
        var keyLow = key.toLowerCase();
        var nameLow = phoneBook[key]['name'].toLowerCase();
        var emailLow = phoneBook[key]['email'].toLowerCase();
        if(keyLow.indexOf(query) >= 0 || nameLow.indexOf(query) >= 0) {
            findPhoneBook[key] = {
                'name': phoneBook[key]['name'],
                'email': phoneBook[key]['email']
            }
            // console.log('нашел',key);
        }
    }

    console.log('findPhoneBook', findPhoneBook)
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
