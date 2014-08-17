var Random = function(){

}

module.exports = Random;

Random.integer = function (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}