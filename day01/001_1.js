/**
 * Created by leehan on 2017. 4. 8..
 */
/**
 * Created by yblee on 2017-04-04.
 */

/* 타입변환 : 코드를 보고 실행결과와 왜 그렇게 됐는지를 알 수 있으면 통과 */
var a = '1';
console.log(a);

var b1 = 'e';
var b2 = '3';

var b = +a;
console.log(b);
var b1 = +a;
console.log(b1);
var b2 = +a;
console.log(b2);

var a1 = {a:1};
var b4 = a1;
b4.a = 6;
console.log(a1.a);
console.log(b4.a);

var c = ''+b;
console.log(c);

var d = Boolean(c);
console.log(d);

var e = !!c;
console.log(e);

console.log(d === e);

console.log("123"*false);
console.log("asdf"*false);
console.log("ff"/0);
console.log("12"/0);

console.log(!"ff");
console.log(!"12");
console.log(!"");

console.log(Number("eeee"));


console.log("!!!!!!!!!!!!!") || (a === 2) && console.log("@@@@@@@@@@@@@");
console.log('' == 0 );

console.log("about ===");
console.log(true==undefined);
console.log(1 == '1' );
console.log(false == 0 );
console.log(false === 0 );
console.log(null==undefined);
console.log(null===undefined);



console.log("1-----------end");
/* 기본형과 참조형*/
/* 마지막이 true인지 false인지 답할 수 있고 그렇게 된 원리를 알 수 있으면 통과 */
a = 1;
b = a;
a = 2;
b === 2;  // true? false?

a = {k: 1};
b = a;
a.k = 2;
b.k === 2;  // true? false?


/* 연산자의 작동원리 */
/* == (The equal operator) 각각이 true인지 false인지 답할 수 있고 그렇게 된 원리를 알 수 있으면 통과 */
'' == 0;
undefined == null;
true == 100;
true == 1;
false == 0;
false == -1;
'1234' == 1234;

/* () The grouping operator : 아래 코드 설명가능 */
console.log("about grouping operation");
console.log( (function (){})() );
(1 == true) && (function (){ console.log("1===true"); })();
(function(){ console.log('hi'); })();

console.log( ({}).__proto__.constructor );


/* &&, || 연산자 */
//단축 판단
console.log("about &&, || 연산자");

//&& 모두 true인지 검사 : 왼쪽->오른쪽으로 평가 진행한다. 평가중 false인 조건이 있으면 해당 조건을 return
//모두 true이면 마지막 조건을 return
console.log(1 && true && 'str' && {});
console.log(1 && true && 0 && 4);

//|| 하나라도 true인지 검사 : 왼쪽->오른쪽으로 평가 진행한다. 평가중 true인 조건이 있으면 해당 조건을 return
//모두 false이면 마지막 조건을 return
console.log(0 || true || 'str' || {});
console.log(0 || false || 'str' || {});
console.log(0 || false || {} || '');
console.log(0 || false || false || '');

console.log(0 || true && true && '' );

console.log(typeof {});
console.log( Boolean({}) );


1 && true && 'str' && {};   // 이걸 실행하면 뭐가 나올까요?
1 || true || 'str' && {};   // 이걸 실행하면 뭐가 나올까요?
var x = a || 1;   // 이 의미는 뭘까요?  -> a의 값이 없으면 1 할당 하라..
var a2;
var a3 = null;
var a4 = 5;
var x2 = a2 || 1;
var x3 = a3 || 1;
var x4 = a4 || 1;
console.log(x2);
console.log(x3);
console.log(x4);


/* 객체와 배열의 표기법, 성능 : 아래의 두 가지 표기법 중 어떤게 더 빠르고 어떤걸 더 많이 쓸까요? */
var obj = {};  //-> literal 표
var obj2 = new Object();

var arr = [];
var arr2 = new Array();
//-> js는 줄여서 코딩하는게 미덕......ㅎ 과연 성능은???????
//현재는 별의미 없다.


/* 자바스크립트의 동적 파라미터 이해 및 사용방법 알고 있는지 체크 */

/* HTML 내부에 자바스크립트 선언위치는? */


/* 일급객체란? */
//변수나 데이터구조에 담을 수 있다
//파라미터로 전달 할 수 있다
//반환값으로 사용 할 수 있다

/* console.log()는 함수일까요? 메서드일까요? */
//-> 객체의 속성으로 정의된 것은 메서드라 한다...왜??


console.log("about 유사배열");
var obj = {a:11, b:22,c:33};
for(ind in obj){
    console.log(obj[ind]);
}
console.dir(obj);
console.log(obj.__proto__.constructor);

var str1 = new String("asdf");
console.dir(str1);
var str2 = "asdf";
console.dir(str2);


function argTest(){
    console.log(arguments);
}
argTest([2,3,3],'ss',333, new String("dddd"), function(){var a=1; console.log(a)});



/* prototype을 설명해 보세요 */

/* scope : 아래 나온 코드의 모든 함수, 변수의 유효범위(scope)를 확인해 보세요. */
//scope은 블럭{} 단위가 아니라 함수 단위임..
function outer () {   // 예 : outer 함수는 전역(window)에서 유효
    inner();
    var a = 1;  // 이후 모든 부분에서 사용 가능
    //inner();
    function inner () { // outer()함수 전체에서 사용 가능
        console.log(x);     // undefined
        var x = 2;  // inner() 함수 안에서 사용 가능
        console.log(a);     //inner 함수가 실행 되기 전에 a가 정의 되어 있으면 사용 가능, 아니면 undefined
    }
    console.log(b);
    var b = 2;  // 이후 모든 부분에서 사용 가능
    if(a==1) {  //
        var c = 3;  // 이후 모든 부분에서 사용 가능
    }
    console.log(b);
    console.log(c);// 블럭 단위가 아니기 때문에 var c도 선언 된 것으로 사용 가능
}
outer();