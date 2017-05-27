/**
 * Created by leehan on 2017. 4. 15..
 */
//Closure
/*
var outerValue = 'outerValue';
var later;

function outerFunction() {
    var innerValue = 'innerValue';

    function innerFunction() {
        console.log(outerValue);
        // innerValue는 있을까?
        console.log(innerValue);
    }
    later = innerFunction;
}

outerFunction();

later();*/

//--------------------------------

/*
var outerValue = 'outerValue';

var later;

function outerFunction() {
    // 함수 내에 변수를 하나 선언한다. 이 변수의 유효 범위는 함수 내부로 제한이 되고,
    // 함수 외부에서는 접근할 수 없다.
    var innerValue = 'innerValue';

    // inner 함수에 매개변수를 추가한다.
    function innerFunction(paramValue) {
        console.log(outerValue);
        console.log(innerValue);
        console.log(paramValue);    // 매개변수를 볼 수 있는지 테스트
        console.log(tooLate);    // 클로저가 함수가 선언된 이후에 정의된 변수를 볼 수 있는지 테스트
    }

    later = innerFunction;
}

console.log(tooLate);   // outer closure에서는 tooLate를 쓸 수 없다.

// innerFunction을 정의한 후에 변수를 선언
var tooLate = 'tooLate';
outerFunction();

later('paramValue');
*/


//-------------------------------------
function DtoObj(initVal) {
    var val = initVal;

    this.getVal = function () {  // this는 새로 만들어진 객체를 가리킴
        return val;
    };

    this.setVal = function(pVal) {
        val = pVal;
    }
}

var dto = new DtoObj(3);

// dto 객체의 내부 변수는 getter를 통해서만 접근하여 값을 받을 수 있다.
console.log(dto.getVal()); // 3
// dto 객체의 내부 변수는 setter를 통해서만 접근하여 값을 바꿀 수 있다.
dto.setVal(4);
console.log(dto.getVal()); // 4
dto.val = 5;
console.log(dto.getVal()); // 4

