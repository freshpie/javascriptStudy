/**
 * Created by leehan on 2017. 4. 15..
 */
function Func(x, y) {
    this.x = x;
    this.y = y;
}

var func = Func(1, 2);



var a = {a: 1};
// a ---> Object.prototype ---> null

var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (상속됨)

var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

var d = Object.create(null);
// d ---> null
console.log(d.hasOwnProperty); // undefined이다. 왜냐하면 d는 Object.prototype을 상속받지 않기 때문이다.


var e = Object.create(c);
console.log(e.hasOwnProperty);