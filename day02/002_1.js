/**
 * Created by leehan on 2017. 4. 15..
 */
console.log(Object.toString());

Object.toString = function(){return ""};
console.log(Object.toString());



function f(a){
    var x= a;
    return function(){
        console.log(x);
    }
}
var func =f(1);
func();
console.dir(func);



//======================================

function Person(name){
    this.name = name;
}

Person.prototype.getName=function () {
    return this.name;
}
Person.prototype.setName= function (name) {
    this.name = name;
}

var p1 = new Person("1");
var p2 = new Person("2");
var p3 = new Person("3");

console.log(p1.getName());
console.log(p2.getName());
console.log(p3.getName());

Person.prototype.getName=function () {
    return "hello " + this.name;
}

console.log(p1.getName());
console.log(p2.getName());
console.log(p3.getName());



//-------------------------
function Circle(r) {
    this.r = r;
}

Circle.prototype.PI = 3.14;

Circle.prototype.getArea = function () {
    return 2 * this.r * this.PI;
}

var r2 = new Circle(2);
console.log(r2.getArea());

var r3 = new Circle(3);
console.log(r3.getArea());

var r3Alien = new Circle(3);
r3Alien.PI = 4.74; //심각, prototype의 PI가 가려졌다(shadows, hides)
                    // --> 재정의 된 건 아니지만 재정의 되었다 볼 수 있다.
console.log(r3Alien.getArea());


Circle.prototype.PI = 1;
console.log(r2.getArea()); //심각, 객체가 생성된 후에도 참조중인 prototype에 의해 내용이 변경된다!



//-------------------------------------------------
var a = {
    func : function(){ console.log(this.val); }
};

var b = Object.create(a);
var c = Object.create(b);
var d = Object.create(c);
﻿var e = Object.create(d);

b.val = 'b.val';
a.val = 'a.val';
e.func();  // b.val

console.log(e .__proto__ .__proto__ .__proto__ .__proto__ === a); // true
