const forAsync = async (arr, callback, chunkSize = 10) => {
    if (!(arr || Array.isArray(arr))) {
        return;
    }

    const arrLen = arr.length;

    if (arrLen > chunkSize) {
        for (let i = 0; i < arrLen; i += chunkSize) {
            const arrChunk = arr.slice(i, i + chunkSize);
            setImmediate(async () => {
                await forAsync(arrChunk, callback);
            });
        }
    } else {
        for (let i = 0; i < arrLen; i += 1) {
            setImmediate(async () => {
                await callback(arr[i]);
            })
        }
    }
}

const myArr = 'wertyuiohgfsdfjk234567890xcvbnm,23456ivbnm,rtyui4567ionm,'.split('');

(async function () {
    await forAsync(myArr, (item) => {
        setTimeout(() => {
            console.log(item);
        }, 3000);
    });

    console.log('Done');
}());