/**
 * Created by leehan on 2017. 4. 22..
 */
/*

"use strict"
myname = 'global';

function func () {
    console.log(myname);
    var myname = 'local';
    console.log(myname);
}
func();*/


var evalVal1, evalVal2, evalVal3;

console.log('evalVal1 : ', evalVal1);
console.log('evalVal2 : ', evalVal2);
console.log('evalVal3 : ', evalVal3);

var jsstring = 'var evalVal1 = 1; console.log(evalVal1);';
eval(jsstring);

var jsstring = 'var evalVal2 = 2; console.log(evalVal2);';
(function () {
    eval(jsstring);
})();

var jsstring = 'var evalVal3 = 3; console.log(evalVal3);';
new Function(jsstring)();

console.log('evalVal1 : ', evalVal1);   // 전역변수 오염
console.log('evalVal2 : ', evalVal2);
console.log('evalVal3 : ', evalVal3);

// Function은 새로운 function을 생성한다.
(function () {
    var local = 1;
    (function () {
        console.log(local);     //1이 출력 된다.. 왜?
    })();
})();
