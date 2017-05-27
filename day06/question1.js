/**
 * Created by leehan on 2017. 5. 27..
 */
var applicants = [
    {name: 'a', age: 23},
    {name: 'b', age: 27},
    {name: 'c', age: 22},
    {name: 'd', age: 25},
    {name: 'e', age: 29}
];
var newApplicants = applicants.slice(0);
newApplicants.map(e => e.age =  e.age+100 );
console.log(applicants);
console.log(newApplicants);
console.log(applicants);


var arrayOriginal = [1,2,3];
var arrayClone = arrayOriginal.slice(0);
console.log(arrayOriginal);
console.log(arrayClone.map(e => e+100));
console.log(arrayOriginal);