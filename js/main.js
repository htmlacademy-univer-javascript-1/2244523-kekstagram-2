function getRandom(number) {
    let result = Math.floor(Math.random()*number);
    return console.log (result);
  }

getRandom (0,2)

function checkMaxLength (line, maxlegth) {
    if (line.length >= maxlegth) {
        return console.log(false);
    }else{
        return console.log(true);
    }
} 

checkMaxLength ("project", 140)