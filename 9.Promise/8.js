var a;
var b = new Promise((resolve, reject) => {
    console.log('promise1');
    setTimeout(() => {
        resolve();
    }, 1000);
})
    .then(() => {
        console.log('promise2');
    })
    .then(() => {
        console.log('promise3');
    })
    .then(() => {
        console.log('promise4');
    });

a = new Promise(async (resolve, reject) => {
    console.log(a);
    await b;
    console.log(a);
    console.log('after1');
    await a;
    resolve(true);
    console.log('after2');
});

console.log('end');

//- promise1
//- undefined
//- end
//- promise2
//- promise3
//- promise4
//- Promise<pedding>
//- after1