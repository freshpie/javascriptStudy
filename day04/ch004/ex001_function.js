/**
 * Created by whybe on 2017. 4. 22..
 */
/* p.69. 함수 */
let mode;

// mode = 'running';   // 이하 코드에서는 log() 함수가 아무런 메시지도 표시 안함
mode = 'debug';   // 이하 코드에서는 log() 함수가 메시지 표시

// 공통으로 사용할 로그함수
function log(title, result) {
    if(mode==='debug') {
        if(arguments.length<2) {
            result = title;
            title = '';
        }
        console.log((title || '') + (JSON.stringify(result) || ''));
    }
}


// ---------------------------- 함수형 자바스크립트 책 시작 ------------------------------------->

/* 고차원 함수 : 함수형 자바스크립트 p.103. */
/*
    고차원 함수는 상당히 구체적으로 정의할 수 있다
    1. 고차원 함수는 일급이다
    2. 함수를 인자로 받는다.
    3. 함수를 결과로 반환한다.
*/

/* p.103. 다른 함수를 인자로 취하는 함수 */

/* p.104. 함수 전달에 대한 고찰 : max, finder, best */

// underscore에서 제공하는 기본적인 max 함수 :
_.max([1, 2, 3, 4, 5]); // 5

// 소수 비교도 문제가 없다
_.max([1, 2, 3, 4.75, 4.5])     // 4.75

// 그렇다면 객체를 비교해야 되는 경우는 어떨까?
var people = [{name: 'Fred', age: 65}, {name: 'Lucy', age: 36}];

// 아래와 같이 하나의 비교대상을 고를 수 있는 하나의 인자를 더 제공한다
_.max(people, function(p) { return p.age; });

// 두 번째 인자 덕분에 숫자 외에도 임의의 객체를 비교할 수 있게 되면서 활용도가 넓어졌지만
// 여전히 제약이 있으며(>를 사용한 대소비교에 국한) 진정한 함수형도 아니다.


/**
 * 최적의 값을 반환하는 finder 함수
 * @param valueFun : coll에서 사용할 값을 추출하는 함수
 * @param bestFun : 최적의 값을 찾는 함수
 * @param coll : 데이터로 사용될 컬럼
 * @returns {RETURN|*|!*}
 */
function finder(valueFun, bestFun, coll) {
    return _.reduce(coll, function(best, current) {
        var bestValue = valueFun(best);
        var currentValue = valueFun(current);

        return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
    });
}

/* finder 함수를 이용해서 언더스코어의 _.max와 같은 동작을 시뮬레이션 */
log('finder(_.identity, Math.max, [1, 2, 3, 4, 5]) => ', finder(_.identity, Math.max, [1, 2, 3, 4, 5]));

log('finder(plucker("age"), Math.max, people) => ', finder(plucker("age"), Math.max, people));

log('finder(plucker("name"), function(x, y) { return (x.charAt(0) === "L") ? x : y }, people) => ', finder(plucker("name"), function(x, y) { return (x.charAt(0) === "L") ? x : y }, people));

// TODO : 해당 영역에서 중복된 로직 찾아보기

/*
    두 가지 전제만 지켜진다면 valueFun 함수는 없앨 수 있다
    1. 첫 번째 인자가 두 번째 인자보다 나을 때 최적의 값 함수는 true 를 반환한다.
    2. 최적의 값 함수(bestFun)는 자신의 인자를 어떻게 언랩하는지 알고 있다.
*/

function best(fun, coll) {
    return _.reduce(coll, function(x, y) {
        return fun(x, y) ? x : y;
    });
}

log("best(function(x, y) { return x > y; }, [1,2,3,4,5]) => ", best(function(x, y) { return x > y; }, [1,2,3,4,5]));


//leehan
//Todo : finder, best로 3의 배수 중 제일 큰 수 뽑아내기 다시 해보기...
var valueArr = [1,14,0,4,5,3,7,8,9,10];
log("============Test 1: ", finder(_.identity,
    function (x, y){
        log("@@@@@@@@@@@@@ X: "+x +" | y: "+ y);
        return (x===3)? x : y;
    }
    , valueArr)
);
log("============Test 2: ", best(
    function (x, y){
        log("!!!!!!!!!!!!! X: "+x +" | y: "+ y);
        return (x===3);
    }
    , valueArr)
);



/* p.106. 4.1.2 함수를 다른 인자로 전달하는 상황에 대한 더 깊은 고찰 : repeat, repeatedly, iterateUntil */

// 조금 전의 finder 함수에서 best라는 함수를 만들며 인자를 하나 줄였지만, 때로는 인자를 더 받는게 합리적일 경우도 있다.
// 서로 관련이 있는 세 가지 함수를 차례로 살펴본 다음에, 이들을 어떻게 더 일반적으로 만들 수 있는지 살펴보자.
// 이 과정에서 득실이 밣생한다.

//_.range(3); ==> [0,1,2]
//_.map([0,1,2], mappingFunction()); ==> [mappingFunction(0), mappingFunction(1), mappingFunction(2)]
function repeat(times, VALUE) {
    return _.map(_.range(times), function() { return VALUE; });
}

log("repeat(4, 'Major') => ", repeat(4, 'Major'));
log("repeat(3, {a:1}) => ", repeat(3, {a:1}));
log("repeat(5, [1,2,3]) => ", repeat(5, [1,2,3]));


/* p.107. 값 대신 함수를 사용하라 */

// 조금 전 함수의 값(VALUE)을 반복하는 방식에서 동작(함수)을 반복하는 함수 만들기
function repeatedly(times, fun) {
    return _.map(_.range(times), fun);
}

log("repeatedly(7, function() { return Math.floor(Math.random()*10+1); }) => ", repeatedly(7, function() { return Math.floor(Math.random()*10+1); }));

// 원한다면 조금 전의 repeat 함수처럼 값을 반복하게 할수도 있다.
log("repeatedly(5, function() { return 'Odeley'; }) => ", repeatedly(5, function() { return 'Odeley'; }));

//TODO : repeatedly를 랩핑해서 문자를 반복시키는 함수로 만들기


/* p.108. 단언컨대 '값 대신 함수를 사용하라' - 종단점 지정하기 */
// repeat, repeatedly는 특정 횟수만큼 반복하기만 할뿐 종단점을 지정할수 없다.
// 종단점을 지정하는 새로운 함수
function iterateUntil(fun, check, init) {
    var ret = [];
    var result = fun(init);

    while (check(result)) {
        ret.push(result);
        result = fun(result);
    }

    return ret;
}

log("iterateUntil(function(n) { return n+n; }, function(n) { return n <= 1024; }, 1) => ", iterateUntil(function(n) { return n+n; }, function(n) { return n <= 1024; }, 1));

// repeatedly로 동일한 작업을 수행하려면 함수를 호출하기 전에 몇 번 호출해야 하는지 알아야 한다.
log("repeatedly(10, function() { return n+n; }) => ", repeatedly(10, function(exp) { return Math.pow(2, exp+1); }));


/* p.110 다른 함수를 반환하는 함수 */
// 상수를 반환하는 함수는 대부분의 함수형 프로그래밍에서 등장하는 유용한 기능이며 줄여서 k라고도 부른다.
// 이런 기능을 하는 함수를 더 명확하게 식별할 수 있도록 always로 만들자

function always(VALUE) {
    return function() {
        return VALUE;
    };
}

// 클로저의 일부 기능을 설명할 때 always를 유용하게 사용할 수 있다.
// 클로저는 한 개의 값이나 레퍼런스를 캡처한 다음에 항상 같은 값을 반환할 것이다.
var f = always(function() {});

log("f() === f() => ", f() === f());

// always는 항상 일정한 값을 생산하므로 VALUE에 바운드된 캡처 함수가 항상 같다는 사실을 확인할 수 있다.

// 반면 새로운 클로저는 매번 다른 값을 캡처한다.
var g = always(function () {});
log("f() === g() => ", f() === g());

// repeatedly에서 익명함수 대신에 always를 사용하면 코드가 더 명확해진다
log("repeatedly(3, always('Odelay')) => ", repeatedly(3, always('Odelay')));


// 이번엔 다른 함수를 반환하는 또 다른 예제로 invoker라는 함수를 살펴보자

/**
 * 함수를 리턴하는 함수 => 처음 실행시에 넘긴 인자를 다음번 실행시에 사용하도록 setting 한다.
 * 처음 실행시에 넘긴 NAME(메서드이름)과 METHOD를 다음 번 실행시에 사용.
 * 처음 invoker의 실행결과로 생성된 함수를 실행할때 넘기는 target의 메서드가 생성시에 넣어둔 이름에 해당하는 메서드인 경우에만 실행되는 함수를 반환
 */
function invoker (NAME, METHOD) {
    return function(target /* args ... */) {    // target은 두 번째 실행시에 받아오게 된다.
        if (!existy(target)) fail("Must provide a target");

        var targetMethod = target[NAME];
        var args = _.rest(arguments);   // target을 제외한 나머지 인자들 저장

        // targetMethod가 처음에 생성될때 넘겨준 함수와 동일한 경우에만 실행
        return doWhen((existy(targetMethod) && METHOD === targetMethod), function() {
            return targetMethod.apply(target, args);
        });
    };
}

var rev = invoker('reverse', Array.prototype.reverse);

log('_.map([[1, 2, 3]], rev) : ', _.map([[1, 2, 3]], rev));


/* 고차원 함수로 인자 캡처하기 */

// TODO : makeAdderMine 함수 구현하기
var add100 = makeAdderMine(100);

// -> 정답
function makeAdderMine(baseNum) {
    return function (target) {
        return baseNum + target;
    }
}

/* p.112. 변수를 캡쳐하는 이유 */
// 외부에서 접근할 수 없게 만들고 싶은 경우
// TODO : 매번 실행할때마다 문자열을 받아서 그 문자열에 증가되는 카운트를 넣어주는 "makeUniqueString"이라는 함수를 만들어보자
// 실행 : var uniqueString = makeUniqueString(1);
// uniqueString('unique');    // -> dari-1
// uniqueString('test');    // -> test-2

// 실행 : var uniqueString = makeUniqueString();
// uniqueString('unique');    // -> dari-0
// uniqueString('test');    // -> test-1
// hint : 캡쳐할 영역을 클로져로 만든다

function makeUniqueString(start) {
    var count = start || 0;
    return function(str) {
        return [str, count++].join('-');
    }
}

var uniqueString = makeUniqueString(1);
log("uniqueString('unique') => ", uniqueString('unique'));    // -> dari-1
log("uniqueString('test') => ", uniqueString('test'));    // -> test-2

var uniqueString = makeUniqueString();
log("uniqueString('unique') => ", uniqueString('unique'));    // -> dari-0
log("uniqueString('test') => ", uniqueString('test'));   // -> test-1


// 시간이 남으면 복습겸 아래 코드도 보자

/* 유사하지만 안전하지 않은 방식 */
var generator = {
    count: 0,
    uniqueString: function (prefix) {
        return [prefix, this.count++].join('');
    }
}

// log("generator.uniqueString('bohr') => ", generator.uniqueString('bohr'));
// log("generator.uniqueString('bohr') => ", generator.uniqueString('bohr'));

// 위의 코드는 함수형이 아니라는 점 외에도 안전하지 않다는 것이 단점
// count를 재할당
generator.count = 'gotcha';
// log("generator.uniqueString('bohr') => ", generator.uniqueString('bohr'));

// 동적으로 바인딩
// log("generator.uniqueString.call({count: 1337}, 'bohr') => ", generator.uniqueString.call({count: 1337}, 'bohr'));

/*
TODO : 카운터를 숨기기
실행 : log("omgenerator.uniqueString('lichking-') => ", omgenerator.uniqueString('lichking-'));   // licking-0
    log("omgenerator.uniqueString('lichking-') => ", omgenerator.uniqueString('lichking-'));   // licking-1

 */
var omgenerator = (function (init) {
    var COUNTER = init;

    return {
        uniqueString: function (prefix) {
            return [prefix, COUNTER++].join('');
        }
    };
})(0);

log("omgenerator.uniqueString('lichking-') => ", omgenerator.uniqueString('lichking-'));
log("omgenerator.uniqueString('lichking-') => ", omgenerator.uniqueString('lichking-'));



/* p.115. 값을 바꿀 때 주의를 기울이자 */
/*
    counter라는 변수에 현재 값을 유지하면 외부에서 데이터를 바꾸지 못하도록 보호할 수 있다는 장점이 있지만 상황이 복잡해지는 단점도 있다.
    자신이 반환할 값과 관련된 인자만을 활용하는 함수를 가리켜 참조투명성(referential transparency)이 있다고 표현한다.
    이 말은 함수가 기대하는 모든 값으로 함수 호출을 대체할 수 있는 함수라는 의미
    uniqueString을 값으로 대체하기 위해서는 uniqueString이 몇 번 실행됐는지 알아야 되는데 미리 알 수 있는 방법이 없기 때문에 상태변이를 활용하는 안좋은 예이다.
    비슷한 역할을 하는 다른 함수형 프로그램으로 충분히 대체 가능하다
*/




/* p.116. 4.2.3 값이 존재하지 않는 상황을 지켜 주는 함수 : fnull */
/* 연산에 null이나 undefined 등이 포함될 경우, 아래처럼 잘못된 연산결과가 나올 수 있다 */

var nums = [1, 2, 3, null, 5];
log("_.reduce(nums, function (total, n) { return total * n; }) => ", _.reduce(nums, function (total, n) { return total * n; }));

/* 기본값을 설정하는 함수를 사용 */
function fnull(fun /*, defaults */) {
    var defaults = _.rest(arguments);

    return function(/* args */) {
        var args = _.map(arguments, function(e, i) {
            return existy(e) ? e : defaults[i];
        });

        return fun.apply(null, args);
    };
}

function defaults(d) {      // 기본값을 담은 객체를 setting
    return function(o, k) {
        var val = fnull(_.identity, d[k]);
        return o && val(o[k]);
    };
}


var safeMulti = fnull(function (total, n) {
    return total * n;
}, 1, 1);

log("_.reduce(nums, safeMulti) => ", _.reduce(nums, safeMulti));



/* TODO : 위의 코드는 반복해서 사용되는 1이라는 기본값을 불필요하게 중복하고 있다. 그냥 하나의 기본 값을 사용하도록 바꿔보자 */

function fnullMine(fun, defaultVal) {
    return function(/* args */) {
        var args = _.map(arguments, function(e, i) {
            return existy(e) ? e : defaultVal;
        });

        return fun.apply(null, args);
    };
}

var safeMultiMine = fnullMine(function (total, n) {
    return total * n;
}, 1);

log("_.reduce(nums, safeMultiMine) => ", _.reduce(nums, safeMultiMine));


/* fnull을 활용하면 설정 객체 문제를 간단히 해결할 수 있다 */
function doSomething(config) {
    var lookup = defaults({critical: 108});

    return lookup(config, 'critical');
}

log("doSomething({whoCares: 42, critical: null}) => ", doSomething({whoCares: 42, critical: null}));
log("doSomething({critical: 9}) => ", doSomething({critical: 9}));
log("doSomething({}) => ", doSomething({}));


/* p.118. 지금까지 배운 내용을 모두 활용: 객체 검증자 */
// 정해진 기준으로 객체의 정확성을 검증하는 기능을 구현해보자


// true나 false를 반환하는 찬반형 함수들을 인자로 받아 검증 함수를 반환하는 함수
function checker(/* validators */) {
    // 처음 실행시에는 validation 할 함수리스트만 세팅
    var validators = _.toArray(arguments);
    return function(obj) {
        // 두 번째 실행시
        // reduce의 마지막 인자로 빈배열을 선언하여 해당 함수가 처음 실행될때 errs로 사용
        // 두 번째 순회부터는 실행결과가 errs로 사용됨
        return _.reduce(validators, function(errs, check) {
            if (check(obj)) {   // validation 통과시에는 현재 errs 넘김
                return errs;
            } else {    // 조건을 만족하지 못할 경우에는 에러 메시지를 계속 배열에 추가한다
                // return _.chain(errs).push(check.message).value();
                errs.push(check.message);
                return errs;
            }
        }, []);
    };
}

// 기능검증
var alwaysPasses = checker(always(true), always(true));
log("alwaysPasses({}) => ", alwaysPasses({}));

var fails = always(false);
fails.message = 'a failure in life';
var alwaysFails = checker(fails);

log("alwaysFails({}) => ", alwaysFails({}));

// 검증 함수를 만들 때마다 새로운 메시지 속성을 설정하는 것은 귀찮은 일이다

// 검증을 통과하지 못했을때 보여줄 메시지와 검증찬반형 함수를 인자로 받아서
// 실행준비된 검증찬반형함수에 실패했을 때의 메시지를 'message' 프로퍼티에 담은 함수를 리턴하는 함수
function validator(message, /* 찬반형 */fun) {
    // 함수를 실행한 결과를
    var f = function(/* 인자 */) {
        return fun.apply(fun, arguments);
    };

    f['message'] = message;
    return f;
}

// 다음처럼 활용 가능
var gonnaFail = checker(validator('ZOMG!', always(false)));

log("gonnaFail(100) => ", gonnaFail(100));

// 확인자를 미리 생성해보자
function aMap(obj) {
    return _.isObject(obj);
}

// 이름을 통해서 의도를 명확히 할 수 있다.
var checkCommand = checker(validator('must be a map', aMap));

log("checkCommand({}) => ", checkCommand({}));

log("checkCommand(42) => ", checkCommand(42));

// 키와 관계된 값을 갖는 명령어 객체를 검증해보자
function hasKeys() {
    var KEYS = _.toArray(arguments);    //

    var fun = function(obj) {
        return _.every(KEYS, function(k) {
            return _.has(obj, k);
        });
    };

    fun.message = cat(["Must have values for keys:"], KEYS).join(" ");
    return fun;
}

// 지금까지 만든 함수를 조합
// 마치 조립라인에서 검증 모듈과 같은 역할, 즉 인자를 받아 유효성을 검사한다.
var checkCommand = checker(validator('must be a map', aMap), hasKeys('msg', 'type'));

log("checkCommand({msg: 'blah', type: 'display'}) => ", checkCommand({msg: 'blah', type: 'display'}));
log("checkCommand(32) => ", checkCommand(32));
log("checkCommand({}) => ", checkCommand({}));




// >---------------------------- 함수형 자바스크립트 책 끝 -------------------------------------



/* p.84. 즉시 실행 함수 */
// 기본형식
(function () {
    console.log('한 번만 실행하면 되는 로직을 실행');
})();



/* p.85. 즉시 실행 함수의 매개변수 */
(function (global) {
    // 전역 객체를 'global'로 참조
    console.log(global === window);
})(this);


// 일종의 sandbox 패턴이 된다
(function (jq, us) {
    // 이렇게 사용하면 전역 scope와 다른 새로운 scope이 생긴다
    console.log(Boolean(jq.ajax));
    console.log(Boolean(us.map));
})($, _);


// p.86. 즉시 실행 함수의 반환 값
var initVal = (function () {
    var result = '이런 저런 연산/통신 끝에 받아오는 값';
    return result;
})();
console.log(initVal);


// p.88. 즉시 객체 초기화
({
    // 여기에 설정 값(설정 상수)들을 정의할 수 있다
    maxwidth: 600,
    maxheight: 400,

    // 유틸리티 메서드 또한 정의할 수 있다.
    gimmeMax: function () {
        return this.maxwidth + ' x ' + this.maxheight;
    },

    // 초기화
    init: function () {
        console.log(this.gimmeMax());
        // 더 많은 초기화 작업들..
    }
}).init();


/* p.92. 함수 프로퍼티 - 메모이제이션(Memoization) 패턴 */
var myFunc = function (param) {
    var result;
    if (!myFunc.cache[param]) {
        console.log(param + '(으)로 비용이 많이 드는 연산 수행');
        result = param + ' 연산결과';
        myFunc.cache[param] = result;
    } else {
        console.log(param + '(으)로 cache 된 결과 사용');
        result = myFunc.cache[param]
    }
    return result;
};

// 캐시 저장공간
myFunc.cache = {};

// TODO : 일반적으로 cache를 외부로 노출시키는건 좋은 패턴이 아니다. 외부에서 접근할 수 없는 형식으로 바꿔보자
// => 정답
var myFunc = (function () {
    var cache = {};
    return function(param) {
        var result;
        if (!cache[param]) {
            console.log(param + '(으)로 비용이 많이 드는 연산 수행');
            result = param + ' 연산결과';
            cache[param] = result;
        } else {
            console.log(param + '(으)로 cache 된 결과 사용');
            result = cache[param];
        }
        return result;
    }
})();


/* p.94. 4.9 설정 객체 패턴 */
// addPerson() 함수를 TDD 스타일로 만들어보기
// => test/test001.js 참고






