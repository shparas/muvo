exports.runUnit = function () {
    // console.log("Unit1:\n------");
    // run1();
}

const Task = require('../2.1-models/task');
function run1() {
    Task.find({ user: "paras@live.com" },
        function (err, data) {
            console.log(data);
        });
}







/*
async function putData(body) {
    var url = '/requestHelp?id=5db5f8149be1d778f48696fd&stat=true';
    // Default options are marked with *
    var response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer'
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}
putData("");

async function getData(url = '/tasks?shps2@live.com', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}


async function deleteData(url = '/tasks?id=', id = '') {
    // Default options are marked with *
    const response = await fetch(url + id, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}


async function postData(data) {
    var url = '/tasks';
    var response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}
async function putData(body) {
    var url = '/tasks?id=5db5f18c8b3ca252644b8f09';
    // Default options are marked with *
    var response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(body) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

var body = {
    description: "DESC",
    date: "DATE",
    time: "Time",
    fromStreet: "FromStreet",
    fromCity: "FromCity",
    fromState: "FromState",
    fromZip: 76010,
    toStreet: "ToStreet",
    toCity: "ToCity",
    toState: "ToState",
    toZip: 76013,
    difficulty: 2,
    skillsRequired: 0,
    estimatedTime: 2,
    pay: 10,
    timeStamp: Date.now(),
    user: "paras@live.com"
}
putData(body);

*/