<template>
  <h1>fetch</h1>
</template>

<script>
// 通过promise.race 来实现timeout
const _fetch = (url, options) => {
  let ms = 0,
    promise,
    abort = null;

  // 为abort函数添加promise 的rej。
  // 该promise 在此，一直都是会阻塞
  let promiseAbort = new Promise((res, rej) => {
    abort = () => {
      rej(new Error("timeout abort"));
    };
  });

  promise = Promise.race([fetch(url, options), promiseAbort]);
  Object.defineProperty(promise, "timeout", {
    enumerable: true,
    get() {
      return ms;
    },
    set(newms) {
      ms = newms;
      console.log("time is ", ms);
      // rej abort的promise
      setTimeout(() => {
        abort();
      }, ms);
    }
  });

  return promise;
};

// 测试的；例子
let p = _fetch(
  "http://caipiao.qingkaoqin.cn/api/admin/findAllLkcode.json?merchantId=1&pageSize=20&pageNo=1&t=" +
    Date.now()
);

function consume(reader) {
  var total = 0,
    result = new Uint8Array();
  return new Promise((resolve, reject) => {
    function pump() {
      reader
        .read()
        .then(({ done, value }) => {
          if (done) {
            resolve();
            return;
          }
          total += value.byteLength;
          console.log(
            `received ${value.byteLength} bytes (${total} bytes in total)`
          );
          console.log(value);
          pump();
        })
        .catch(reject);
    }
    pump();
  });
}

p
  .then(response => {
    return consume(response.body.getReader())
    // return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });
// 设置超时时间
// p.timeout = 1000;

export default {};
</script>

<style>

</style>
