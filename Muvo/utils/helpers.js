exports.safe = function(value) {
    return (typeof (value) != 'undefined') ? value : 'undefined';
}

exports.log = function () {
    console.log(...arguments);
}