/**
 * Created by yblee on 2017-05-12.
 * Array 객체 기본 탐구
 *
 */


/* 테스트를 위한 데이터 생성 함수를 만들고 시작하자 */
function range(size, start) {
    let i = start || 0, added = start || 0, arr = [];
    for (; i < size + added; i++) {
        arr.push(i);
    }
    return arr;
}

/*-------------------------------------------------------------- filter */
// 기본
range(10).filter(ele => ele < 5);

// Q. 0~99까지의 배열 중에서 짝수 구하기
// A.
range(100).filter(ele => ele % 2 == 0);
range(100).filter(function (ele) {
    return ele % 2;
});

// Q. 0~99까지의 배열 중에서 짝수이면서 10보다 크고 30보다 작은 수 구하기
// A.
range(100).filter(ele => ele % 2 == 0 && ele > 10 && ele < 30);

// Q. [1, 2, '', {}, [], 4, [1,2], '7', true] 중에서 숫자만 뽑아내기
// A.
[1, 2, '', {}, [], 4, [1, 2], '7', true].filter(e => Number.isInteger(e));

// Q. 아래의 지원자 중 25세 이상만 추출
var applicants = [
    {
        name: 'a',
        age: 23
    },
    {
        name: 'b',
        age: 27
    },
    {
        name: 'c',
        age: 22
    },
    {
        name: 'd',
        age: 25
    },
    {
        name: 'e',
        age: 29
    }
];
//A.
Array.prototype.filter.call(applicants, e => e.age >= 25);
applicants.filter(e => e.age >= 25);


/*-------------------------------------------------------------- find */
// 기본
// 조건을 만족하는 첫 번째 인자를 반환
applicants.find(applicant => applicant.age > 25);


/*-------------------------------------------------------------- findIndex */
// 기본
// 조건을 만족하는 첫 번째 인자의 인덱스를 반환
applicants.findIndex(applicant => applicant.age > 25);


/*-------------------------------------------------------------- map */
// **************  map 함수는 원본이 변경된다!!!!!!!!!!
// 기본 *********************** mapping -> map
// callback 함수의 리턴값으로 새로운 배열을 생성
var newArray = range(10, 1).map(ele => ele * ele);

// Q. applicants 중에서 25세가 넘는 사람들에게는 step1:'pass'라는 키/벨류 추가하기
applicants.map(ele => {
    if (ele.age > 25) {
        return {name: ele.name, age: ele.age, step1: 'pass'}
    }
});
var newApplicants = applicants.map(ele => {
    if (ele.age > 25) {
        ele.step1 = 'pass'
    }
    ;
    return ele;
});
// 질문!! 왜 slice로 복사해서 map을 했는데 자꾸 원본이 변경되나???????
/**
    slice는 아래와 같이 배열 타입에 따라 다르게 동작한다
    - 객체 참조 (및 실제 객체가 아님)의 경우, slice는 객체 참조를 새 배열로 복사합니다.
    원본 배열과 새 배열은 모두 동일한 객체를 참조합니다.
    참조 된 객체가 변경되면 변경 내용은 새 배열과 원래 배열 모두에서 볼 수 있습니다.
     - String 및 Number 객체가 아닌 문자열과 숫자의 경우 slice는 문자열과 숫자를 새 배열에 복사합니다.
    한 배열에서 문자열이나 숫자를 변경해도 다른 배열에는 영향을 주지 않습니다.
*/


// Q. applicants 중에서 이름만 추출
applicants.map(ele => ele.name);


/*-------------------------------------------------------------- reduce */
// accumulator - 누산기...
// 인자를 줄여가며 하나의 값으로 수렴// 기본
range(10).reduce((accumulator, currentValue) => accumulator + currentValue);
// 초기값 지정
range(10).reduce((accumulator, currentValue) => accumulator + currentValue, 10);
// index 활용
range(10).reduce((accumulator, currentValue, index) => {
    console.log('now index : ' + index);
    return accumulator + currentValue;
}, 0);
// 원본 배열 활용
range(10).reduce((accumulator, currentValue, index, arr) => {
    accumulator.push(arr.slice(index));
    return accumulator;
}, []);

// Q. 1~10을 인자로 가진 배열의 모든 숫자를 곱하기.
range(10, 1).reduce((a, v) => a * v);


// Q. [1,2,3,4,5] 배열을 인덱스를 키로 갖고 현재 값의 제곱을 값으로 갖는 배열로 변형 ex) [{0:1},{1:4},...]
// reduce((accumulator, current, index) => (), initialValue);
[1, 2, 3, 4, 5].reduce((a, v) => {
    return {v: v * v};
});
[1, 2, 3, 4, 5].reduce((a, v, i) => {
    var temp = {};
    temp[i] = v * v;
    a.push(temp);
    return a;
}, []);


// Q. 추상화하여 로직을 주입하는 방식으로 바꾸기
// function reduceFunc(arr, func) { ... }
// 이런 식으로 실행 reduceFunc([1,2,3], (accum, curr)=>accum+curr);
function reduceFunc(arr, func) {
    return arr.reduce(func);
    ;
}
reduceFunc([1, 2, 3, 4, 5], (a, v) => a * v);


// Q. 로직은 고정시키고 배열만 동적으로 받을 수 있도록 바꿔보자
function setReduceFunc(reduceFunc) {
    return function (arr) {
        return arr.reduce(reduceFunc);
    }
}
var reducePlusExec = setReduceFunc((a, v) => a + v);
reducePlusExec([1, 2, 3, 4, 5]);

/*-------------------------------------------------------------- reduceRight */
// reduce와 기능 동일. 다만 오른쪽에서 왼쪽으로 배열 순
[1, 2, 3, 4, 5].reduceRight((accumulator, current, index) => {
    var temp = {};
    temp[index] = current ** 2;
    accumulator.push(temp);
    return accumulator;
}, []);


/*-------------------------------------------------------------- some */
// every와 달리, 모든 요소중에 하나라도 해당 조건을 만족하는지 검사. 하나라도 만족하면 true, 모두다 만족하지 않으면 false, ||(or) 연산자와 같다
// 기본
range(10).some(ele => ele > 8);
range(10).some(ele => ele > 9);


/*-------------------------------------------------------------- sort */
// 정렬해주는 함수 (기본 String unicode 오름차순)
// 비교로직(comparator)을 넣는 경우 로직에 따라 정렬 가능
// 기본
['d', 'r', 'a', 'j', 'u'].sort();
[12, 23, 5, 2, 6, 3, 4, 2].sort();

// comparator는 기본적으로 아래의 로직을 따른다
/*
 function compare(a, b) {
 if (a is less than b by some ordering criterion) {
 return -1;
 }
 if (a is greater than b by the ordering criterion) {
 return 1;
 }
 // a must be equal to b
 return 0;
 }
 */


// [12,23,5,2,,6,3,4,2]을 숫자의 대소비교로 정렬
[12, 23, 5, 2, 6, 3, 4, 2].sort((a, b) => a - b);

/*-------------------------------------------------------------- slice */
// 배열을 시작인덱스부터 종료 인덱스까지 자르는 새로운 배열 리턴
// [].slice(시작인덱스, 종료인덱스)
// 원본을 건드리지 않는다
var arr = [1, 2, 3, 4, 5];
var newArr = arr.slice(1, 3);
console.log(newArr);
console.log(arr);


/*-------------------------------------------------------------- splice */
// 배열을 시작인덱스부터 갯수만큼 삭제(삭제된 값 리턴)
// [].slice(시작인덱스, 삭제할 갯수, 추가값1, 추가값2, ...)
var newArr = arr.splice(1, 3);
console.log(newArr);
console.log(arr);

// 값을 추가하는 경우
arr = [1, 2, 3, 4, 5];
newArr = arr.splice(1, 3, 7, 8);
console.log(newArr);
console.log(arr);


/* 종합문제 */
var data = range(100, 1);

// Q. data를 앞에서부터 50개의 요소 newData에 복사
var newData = data.slice(0, 50);

// Q. 복사한 데이터 중 뒤의 20개는 삭제하고 삭제한 곳에 99, 100을 넣기

// Q. 역순으로 정렬
newData.sort((n1, n2) => n2 - n1);

// Q. 해당 데이터를 5의 배수만 있는 배열로 변경
newData = newData.filter(e => e % 5 === 0);

// Q. 해당 데이터가 모두 5의 배수인지 확인
newData.every(e => e % 5 === 0);

// Q. 해당 데이터중 하나라도 3의 배수인지 확인
newData.some(e => e % 3 === 0);

// Q. 해당 데이터의 3의 배수인 값 가져오기
newData.find(e => e % 3 === 0);

// Q. 해당 데이터의 3의 배수인 값의 인덱스 가져오기
newData.findIndex(e => e % 3 === 0);

// Q. 해당 데이터를 아래와 같은 형태로 바꾸기
// [{idx:0, value:100}, {idx:1, value:50} ... ];
newData.reduce((a, c, i) => {
    var temp = {};
    temp = {idx: i, value: c};
    a.push(temp);
    return a;
}, []);

// 질문 !! 왜 인덱스 0번은 안타나???????????????
newData.reduce((a, c, i) => {
    console.log(a, c, i);
    if (!Array.isArray(a)) {
        var a = [];
        var temp = {};
        temp = {idx: i, value: c};
        a.push(temp);
        return a;
    } else {
        var tempArr = Array.from(a);//Array.prototype.slice.call(a,0);
        var temp = {};
        temp = {idx: i, value: c};
        tempArr.push(temp);
        return tempArr;
    }
});
/**
    콜백이 호출된 첫 번째는, previousValue 및 currentValue 두 값 중 하나일 수 있습니다.
    reduce 호출에 initialValue가 제공된 경우,
    그러면 previousValue는 initialValue와 같고 currentValue는 배열의 첫 번째 값과 같을 겁니다.
    initialValue가 제공되지 않은 경우,
    그러면 previousValue는 배열의 첫 번째 값과 같고 currentValue는 두 번째와 같을 겁니다.
    빈 배열에 initialValue가 제공되지 않은 경우,
    TypeError가 발생됩니다.
    배열이 요소가 하나(위치와 관계없이)뿐이고 initialValue가 제공되지 않은 경우 또는 initialValue는 제공됐으나 배열이 빈 경우,
    그 단독 값이 callback 호출 없이 반환됩니다.
*/

// Q. 해당 데이터를 아래와 같은 형태로 바꾸기
// 예 : [ {0: 100}, {1: 50}, ...]


// 위와 같은 흐름을 제어하기
function createPerson() {
    var firstName = "";
    var lastName = "";
    var age = 0;

    return {
        setFirstName: function (fn) {
            firstName = fn;
            return this;
        },
        setLastName: function (ln) {
            lastName = ln;
            return this;
        },
        setAge: function (a) {
            age = a;
            return this;
        },
        toString: function () {
            return [firstName, lastName, age].join(' ');
        }
    };
}

/*
 console.log(
 createPerson()
 .setFirstName('Mike')
 .setLastName('Fogus')
 .setAge(108)
 .toString()
 );
 */


// _.chain : Returns a wrapped object.
//  Calling methods on this object will continue to return wrapped objects until value is called.

/*
 console.log(
 _.chain(library)
 .pluck('title')
 .sort()
 );
 */

/*
 console.log(
 _.chain(library)
 .pluck('title')
 .sort()
 .value()
 );
 */


var TITLE_KEY = 'titel';

// ... 꽤 많은 코드

/*
 console.log(
 _.chain(library)
 .pluck(TITLE_KEY)
 .sort()
 .value()
 );
 */

// Invokes interceptor with the object, and then returns object. The primary purpose of this method is to "tap into" a method chain, in order to perform operations on intermediate results within the chain.

/*
 _.chain(library)
 .tap(function (o) { console.log(o); })
 .pluck(TITLE_KEY)
 .sort()
 .value();
 */

/*
 _.chain(library)
 .pluck(TITLE_KEY)
 .tap(function (o) { console.log(o); })
 .sort()
 .value();
 */

function LazyChain(obj) {
    this._calls = [];
    this._target = obj;
}

LazyChain.prototype.invoke = function (methodName /*, args */) {
    var args = _.rest(arguments);

    this._calls.push(function (target) {
        var meth = target[methodName];

        return meth.apply(target, args);
    });

    return this;
};

LazyChain.prototype.force = function () {
    return _.reduce(this._calls, function (target, thunk) {
        return thunk(target);
    }, this._target);
};

LazyChain.prototype.tap = function (fun) {
    this._calls.push(function (target) {
        fun(target);
        return target;
    });

    return this;
}









