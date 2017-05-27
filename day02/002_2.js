/**
 * Created by leehan on 2017. 4. 15..
 */

console.log(typeof foo); // function pointer
console.log(typeof bar); // undefined
console.log(typeof a); // undefined

//console.log(foo());
var a="asdfasdf";
var foo = 'hello1';
var bar = function() {
        return 'world';
};

function foo() {
    return 'hello2';
}

//console.log(foo);
console.log(typeof foo); // function pointer
console.log(typeof bar); // undefined



