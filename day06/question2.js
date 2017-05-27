/**
 * Created by leehan on 2017. 5. 27..
 */
function range(size, start) {
    let i = start || 0, added = start || 0, arr = [];
    for (; i < size + added; i++) {
        arr.push(i);
    }
    return arr;
}
var newData = range(50, 1);

var arr1 = newData.reduce((a, c, i) => {
    console.log(a, c, i);
    // var temp = {};
    // temp = {idx: i, value: c};
    // a.push(temp);
    // return a;
}, []);

console.log(arr1);

// 질문 !! 왜 인덱스 0번은 안타나???????????????
var arr2 = newData.reduce((a, c, i) => {
    console.log(a, c, i);
    // if (!Array.isArray(a)) {
    //     var a = [];
    //     var temp = {};
    //     temp = {idx: i, value: c};
    //     a.push(temp);
    //     return a;
    // } else {
    //     var tempArr = Array.from(a);//Array.prototype.slice.call(a,0);
    //     var temp = {};
    //     temp = {idx: i, value: c};
    //     tempArr.push(temp);
    //     return tempArr;
    // }
});
console.log(arr2);