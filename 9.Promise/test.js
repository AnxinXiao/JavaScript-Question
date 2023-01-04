setTimeout(() => {
    console.log(1)
}, 0)
process.nextTick(
    function () {
        console.log(2)
    }
)
console.log(3)
