# 原型和原型链

## 原型

![原型](C:\Users\$\Desktop\JavaScript Question\3.原型和原型链\原型.png)

1. **原型**

   每个函数都会自动附带一个属性`prototype`，这个属性的值是一个普通对象，称之为原型对象

2. **实例**

   instance，通过`new`产生的对象称之为实例。

   > 由于JS中所有对象都是通过`new`产生的，因此，严格来说，JS中所有对象都称之为实例

3. **隐式原型**

   每个实例都拥有一个特殊的属性`__proto__`，称之为隐式原型，它指向构造函数的原型

这一切有何意义？

**当访问实例成员时，先找自身，如果不存在，会自动从隐式原型中寻找**

**这样一来，我们可以把那些公共成员，放到函数的原型中，即可被所有实例共享**

```js
Array.prototype.unique = function() {
  return [...new Set(this)];
}

['1', '1', '2'].unique(); // ['1', '2']
new Array('1', '1', '2').unique(); // ['1', '2']
['1', '1', '2'].unique().reverse(); // ['2', '1']
```

## 原型链

**所有的对象都是通过`new 函数`的方式创建的**

```js
var u1 = new User('邓', '旭明'); // 对象 u1 通过 new User 创建
var u2 = { // 对象 u2 通过 new Object 创建
  firstName: '莫',
  lastName: '妮卡'
}
// 等效于
var u2 = new Object(); 
u2.firstName = '莫';
u2.lastName = '妮卡';
```

上面的代码形成的原型图如下

![test1](C:\Users\$\Desktop\JavaScript Question\3.原型和原型链\test1.png)

原型对象本身也是一个对象，默认情况下，是通过`new Object`创建的，因此，上面的两幅原型图是可以发生关联的

`Object.prototype.__proto__`比较特殊，它固定指向null

可以看出，u1的隐式原型形成了一个链条，称之为**原型链**

当读取对象成员时，会先看对象自身是否有该成员，如果没有，就依次在其原型链上查找

![Partial prototype chain](C:\Users\$\Desktop\JavaScript Question\3.原型和原型链\Partial prototype chain.png)

## 完整的链条

![Complete](C:\Users\$\Desktop\JavaScript Question\3.原型和原型链\Complete.png)

**原型对象的constructor属性指向其构造函数**

### 在原型上更改会产生多大影响

更改构造函数的原型会对所有原型链上有该构造函数的原型的对象产生影响

### 学会利用原型链判断类型

1. `instanceof`关键字【常用】

   ```javascript
   object instanceof constructor
   // 判断object的原型链中，是否存在constructor的原型
   ```

2. `Object.getPrototypeOf()`【不常用】

   ```javascript
   Object.getPrototypeOf(object);
   // 返回object的隐式原型
   ```

### 学会创建空原型的对象

1. 利用`Object.create()`

   ```javascript
   Object.create(target);
   // 返回一个新对象，新对象以target作为隐式原型
   ```

2. 利用`Object.setPrototypeOf()`

   ```javascript
   Object.setPrototypeOf(obj, prototype);
   // 设置obj的隐式原型为prototype
   ```

## 总结

- 每个对象都有一个 __proto__ 属性，该属性指向自己的原型对象
- 每个构造函数都有一个 *prototype* 属性，该属性指向实例对象的原型对象
- 原型对象里的 *constructor* 指向构造函数本身