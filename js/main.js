function getRandom(number) {
    let result = Math.floor(Math.random()*number);
    return console.log (result);
  }

function checkMaxLength (line, maxlegth) {
    if (line.length >= maxlegth) {
        return console.log(false);
    }else{
        return console.log(true);
    }
} 
