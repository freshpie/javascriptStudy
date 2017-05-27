/*
1. 처음에 엔진이 전체 코드 검사해서 function 찾아서 이름으로 등록 (a : function)
2. 두 번째로 엔진이 전체 코드 검사해서 var 찾아서 이름으로 등록하고 undefined 할당
단, 이미 사용중인 이름이면 등록 안하고 skip
(위의 코드는 a 가 이미 등록되어 있으므로 skip)
3. 한 줄씩 읽으면서 해석. 이때 function 선언문(declaration)은 이미 읽은 코드기 때문에 읽지않고 skip
(위의 코드는 첫 번째 줄에 a가 1로 재할당, 두 번째 줄에 function 선언문 건너뛰고, 세 번째 줄에 console.log 로 찍으므로 1 출력)*/


/*
console.log(a);
function a(){}
var a = 1;
console.log(a);
*/


/*console.log(a);
var a = 1;
function a(){}
console.log(a);*/

/*
console.log(a);
var a = 1;
var a = function a(){}
console.log(a);*/

/*
console.log(a);
var a = function a(){}
var a = 1;
console.log(a);*/


