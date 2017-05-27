/**
 * Created by leehan on 2017. 5. 13..
 */


// Q. Array.of(), Array.slice()는 가능할까? 가능하다면 왜? 불가능하다면 왜? 일까?

var arr = [1,2,3,5,6];

var arrOf = Array.of(arr);
var arrSlice = arr.slice();
//var arrSlice2 = Array.slice();


console.log(arrOf);
console.log(arrSlice);

console.dir(Array.__proto__);
console.log(Array.__proto__ === Function.prototype);

console.dir(Array.__proto__.__proto__); //object
console.dir(Array.__proto__.__proto__.__proto__);   //null

// A. @ Object -> function -> array -> [1,2,3]일때
// [1,2,3].slice() 하게 되면 chaining 을 통해 상위 array의 prototype  의 slice를 참조한다
// 하지만 Array.slice 하게 되면 prototype에 접근하는 것이 아니라 내부메소드를 찾게 된다.
// 당연히 내부메소드에는 slice가 없으므로 chianing으로 상위인 Function에서 slice를 찾게 되는데
// 여기도 없으므로 결과적으로 slice가 없는 것이다..


// Q. Array는 오브젝트일까? 함수일까? 근거는?
//A. 생성자 함수 이면서 오브젝트...


//Q. 인자가 100개인 배열 만들기
new Array(101).join('a');


// Q.문자를 고정시킨채 숫자만 받을 수 있는 래핑함수 만들기
// 실행예. repeatA(3) -> 'aaa'
// 1. bind를 사용해서 만들어 보자
// 2. curry1이라는 함수를 사용해서 만들어 보자
// TODO : 받아오는 파라미터의 갯수에 상관없는 curry 함수 만들기


function repeatStr(size, str){
    return new Array(size+1).join(str);
}
console.log(repeatStr(5, 'a'));

//위에 함수에서 갯수를 고정시켜 보자
function repeatStr2(size, str){
    return new Array(size+1).join(str);
}
var repeatFixSize = repeatStr2.bind(null, 8);   //bind(thisArg, [optionArg...])
console.log(repeatFixSize('C'));

//문자를 고정시켜 보자
function repeatStr3(str, size){
    return new Array(size+1).join(str);
}
var repeatFixStr = repeatStr3.bind(null, '@');   //bind(thisArg, [optionArg...])
console.log(repeatFixStr(2));


//
function x(func){
    return function (param) {
        return func(param);
    }
}
var log = x(console.dir);
log(Array);
log(Function); //closure 형성 -> param으로 넘긴 console.dir 함수가 계속 유지 된다..?


function rightCurry(func, size) {
    return function (arg) { //익명일 경우 자기자신.....
        return func(size, arg);
    }
}
var repeat100 = rightCurry(repeatStr, 100);
console.log(repeat100('b'));


//유사배열을 배열처럼 쓰는 것..
// 1. call 등을 이용
// 2. Array.from 이용


//=====  every 사용  ==========
// 모든 요소가 해당 조건을 만족하는지 검사. 모두 만족해야 true, 하나라도 만족하지 않으면 false, &&(and) 연산자와 같다
[1, 2, 3, 4, 5].every(function (ele) {
    return ele > 0;
});
[1, 2, 3, 4, 5].every(function (ele) {
    return ele > 1;
});



// Q. 위의 함수를 추상화해서 로직을 주입하는 방식으로 바꿔보자
console.log("-------------------------------------")
function everyWithFunc(arr, func){
    return arr.every(func);
}
console.log(everyWithFunc( [1,5,6,7], function(ele){return ele > 4; } ) );

//위의 함수에서 로직을 고정시켜 보자
//TODO: every도 추상화 시켜보자!!
function everyWithFuncSet(func){
    return function (arg){
        //console.log(arg.constructor);
        if(!Array.isArray(arg)){
            return 'input not Array!!';
        }
        return arg.every(func);
    }
}
function everyWithFuncSet2(func){
    return function (){
        console.log(arguments);
        return Array.from(arguments).every(func);
    }
}
console.log("ele > 4 condition");
var isValidWithEveryWithFuncSet = everyWithFuncSet(function(ele){return ele > 4; });
console.log(isValidWithEveryWithFuncSet([1,6,7,8]));
console.log(isValidWithEveryWithFuncSet(2));

console.log("Number.isInteger condition");
isValidWithEveryWithFuncSet = everyWithFuncSet(function(ele){return Number.isInteger(ele); });
console.log(isValidWithEveryWithFuncSet([1,6,7,8]));
console.log(isValidWithEveryWithFuncSet([1,6,7,8,'d']));

console.log("Array.isArray condition");
isValidWithEveryWithFuncSet = everyWithFuncSet2(function(ele){return Array.isArray(ele); });
console.log(isValidWithEveryWithFuncSet([1,6,7,8],[3,2,2]));
console.log(isValidWithEveryWithFuncSet({},[1,6,7,8,'d']));

//TODO: 확인해보기
function isAllValidSet(isValid) {
    return function (arr) {
        arr.every(isValid);
    };
}
var isArrayCheck = isAllValidSet(Array.isArray);
console.log(isArrayCheck([3,3],[5,5]));








