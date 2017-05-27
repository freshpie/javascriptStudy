/*
* 호출패턴과 this
*
* */

//https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this

//메서드 호출
var objA = {
    sum:0,
    add: function(addVal){
        this.sum += addVal;
        return this.sum;
    }
}
console.log(objA.sum);
console.log(objA.add(2));
console.log(objA.add(3));

var directAddCall = objA.add;
console.log(directAddCall(2)); //NaN  why???????????
console.log("----------------------");

//함수 호출
function funcA(){
    console.dir(this);
}
//funcA();  //여기서는 this가 window객체에 맵핑된다

function funcB(){
    "use strict"
    console.dir(this);
}
funcB();    //use strict 구문을 사용하게 되면 this에 window객체가 맵핑되는 모호함을 방지 한다.
            //따라서 this 객체는 undefined를 가짐
//window.funcB();   //window객체를 명시적으로 사용하게 되면 this는 window객체와 맵핑된다.


//생성자에서 호출
function funcC() {};
var funcC2 = new funcC();
//funcC().prototype.checkThis = function(){console.dir(this)};
//funcC2.checkThis();


//call과 apply
function funcD1(a,b,c){
    console.log(this.x, this.y, a,b,c);
    console.log(this);
}
function funcD2(){
    console.log(this.x, this.y);
}
function funcD3(a,b,c,d){
    console.log(this.x, this.y, a,c,d );
}
function funcD4(){
    console.log(this.x, this.y);
}
funcD1();
funcD1.call({x:'a1', y:'b1'},3,4,5);
funcD1.call(2,{x:'a2',y:'b2'},4,5);

funcD2.call({x:'a3', y:'b3'},3,4,5);

funcD3.apply({x:'a4', y:'b4'},[3,5,6]);

funcD4.bind({x:'a5', y:'b5'},[64,76,77],{x1:'a6', y2:'b6'},[3,5,6]);
//funcD4.bind(thisArg, optionalArgs...);

console.dir(funcD4());

function bar() {
    console.log(Object.prototype.toString.call(this));
}
bar.call(7);
//this맵핑은 object이기 때문에 기본타입을 넘길 경우 내부적으로 toObject가 동작하여 기본타입은 wrapping 된다.


function callMe(arg1, arg2){
    var s = "";

    s += "this value: " + this;
    s += "\n";
    for (i in callMe.arguments) {
        s += "arguments: " + callMe.arguments[i];
        s += "\n";
    }
    return s;
}
console.log("Original function: ", callMe(1, 2));
console.log("Function called with call: ", callMe.call(3, 4, 5));
console.log("Function called with apply: ", callMe.apply(3, [4, 5]));
//차이점 인자 전달 방식 차이 뿐... call은 인수로..apply는 배열로..



function Product(name, price) {
    this.name = name;
    this.price = price;

    console.log("product", this);
    if (price < 0)
        throw RangeError('Cannot create product "' + name + '" with a negative price');
    return this;
}

function Food(name, price) {
    Product.call(this, name, price);
    this.category = 'food';
    console.log("food", this);
}
Food.prototype = new Product();     //type 주입?? what is prototype - 상속?
var cheese = new Food('feta', 5);
console.log(cheese);

if(cheese instanceof bar){
    console.log("cheese instanceof bar");
}else if(cheese instanceof Product){
    console.log("cheese instanceof Product");
}


