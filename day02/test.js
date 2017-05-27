var makeAdd = function (c){
    var x=81;
    console.log(x);
    console.log(this(4));
    console.log(this);
}

function mod(c){
    var y = c;
    console.log(y, "mod call");
}

var mk = makeAdd.bind(mod);
mk();