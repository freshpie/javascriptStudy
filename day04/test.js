/**
 * Created by leehan on 2017. 4. 29..
 */


/* new를 강제하는 패턴 */

// 일반적인 생성자함수
// function Waffle() {
//     this.tastes = 'yummy';
// }
//
// // new를 강제하도록 하는 패턴
// function GoodWaffle() {
//     if(!(this instanceof GoodWaffle)) {
//         return new GoodWaffle();
//     }
//     this.tastes = 'yummy';
// }
//
// var waffle = Waffle(),
//     waffle2 = new Waffle(),
//     waffle3 = GoodWaffle(),
//     waffle4 = new GoodWaffle();
//
// console.log(waffle instanceof Waffle);
// console.log(waffle2 instanceof Waffle);
// console.log(waffle3 instanceof GoodWaffle);
// console.log(waffle4 instanceof GoodWaffle);
//
//
// // 이 패턴도 완전하지 않다
// var whatthe = GoodWaffle.call(new GoodWaffle);
// console.log(whatthe instanceof GoodWaffle);


// TODO : 위의 Person은 new와 함께 호출하지 않으면 생성자의 역할을 제대로 할 수 없다 new를 강제하는 패턴으로 바꿔보자.
var Person = (function () {
    var RealPerson = function (name) {
        this.name = name;
    };
    RealPerson.prototype.say = function () {
        return "I'm " + this.name
    };
    return function(initName) {
        return new RealPerson(initName);
    }
})();



// 만든 코드가 아래의 출력을 만족해야 통과
// var man = Person('adam');
// console.log(man.name);   // adam
// console.log(man.say());     // I'm adam

// var alien = Person.call(new Person);
// console.log(man.name);   // adam
// console.log(man.say());     // I'm adam