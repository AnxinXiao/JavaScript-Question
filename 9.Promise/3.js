const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject();
    }, 1000);
});
const promise2 = promise1.catch(() => {
    return 2;
});

console.log('promise1', promise1); //- promise1 Promise { <pending> }
console.log('promise2', promise2); //- promise2 Promise { <pending> }

setTimeout(() => {
    console.log('promise1', promise1); //- promise1 Promise { <rejected> undefined }
    console.log('promise2', promise2); //- promise2 Promise { 2 }
}, 2000);
