/**
 * Created by yblee on 2017-05-12.
 * Array 객체 기본 탐구
 *
 */

/* Array Object의 구조 보기 */
console.dir(Array);


var arr = new Array(3,5,7,8);

console.log(Array.isArray(arr));
// Quiz. Array.of(), Array.slice()는 가능할까? 가능하다면 왜? 불가능하다면 왜? 일까?


console.log(arr.slice(2,3));

var arr2 = Array.of(5,43,21,0,8);
console.log(arr2);
var arr3 = arr2.slice(2,4);
console.log(arr3);

console.log("========================");

console.log(arr2);
console.log(arr3);
//Array.slice();
var arr4 = [].slice();
console.log(arr4);

console.dir([].__proto__);

var arr5 = new Array(100);
console.log(arr5);

var arr6 = []; arr6.length = 100;
console.log(arr6);

//join() 메서드는 배열의 모든 요소를 연결해 하나의 문자열로 만듭니다.
function repeatStr(str, cnt) {
    console.log('str : ',str, '|','cnt : ', cnt);
    return new Array(cnt+1).join(str);
}
var arr7 =repeatStr('a',5);
console.log(arr7);
console.log(arr7.length);


var arr8 = new Array(6);
console.log(arr8);
console.log(arr8.length);
console.log(arr8.join('b'));
console.log(arr8.join('b').length);


var arr9  = [1,2,3,4,5,6];
var arr10 = arr9.slice();   //deep copy? shallow copy??

arr9.slice(2,5);

console.log(arr10);


// Array는 오브젝트일까? 함수일까? 근거는?
