async function m1() {
    return 1;
}

async function m2() {
    const n = await m1();
    console.log(n);
    return 2;
}

async function m3() {
    const n = m2();
    console.log(n);
    return 3;
}

m3().then((n) => {
    console.log(n);
});

m3();

console.log(4);

//- Promise <pedding> (m3)
//- Promise <pedding> (m2)
//- 4
//- 1
//- 3
//- 1