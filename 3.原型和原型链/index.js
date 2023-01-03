console.log(Function.prototype === Function.__proto__) //- true
const myFuncSum = new Function('a', 'b', 'return a+b');
console.log(myFuncSum.prototype.__proto__ === Object.prototype); //- true
console.log(new myFuncSum(1, 2).__proto__.__proto__ === Object.prototype); //- true
console.log(new myFuncSum(1, 2).__proto__.__proto__.__proto__ === null) //- true

const obj = [1, 2, 3]
console.log(obj.toString()) //- 1,2,3

//- instanceof关键字 --> 判断object的原型链中，是否存在constructor的原型
console.log(Object.prototype.toString.call(obj)) //- [object Array]
console.log(obj instanceof Array && obj instanceof Object) //- true

//- getPrototypeOf() --> 返回object的隐式原型
console.log(Object.getPrototypeOf(obj) === Array.prototype) //- true

// Object.create() --> 创建空原型对象
console.log(Object.create(null))

// Object.setPrototypeOf() --> 设置obj的隐式原型为prototype
Object.setPrototypeOf(obj, null)
console.log(obj.__proto__) //- undefined