function minimumAbsoluteDifference(nums) {
  let res = [];
  let ans = [];
  function separation(nums) {
    nums = nums.split`,`.map((e) => +e);

    let mid = nums.length / 2 - 1;
    let arr1 = [];
    let arr2 = [];

    for (let i = 0; i <= mid; i++) {
      arr1.push(nums[i]);
    }
    for (let i = nums.length - 1; i > mid; i--) {
      arr2.push(nums[i]);
    }
    return [arr1, arr2];
  }

  function response(arr, current) {
    arr = arr.map((i) => Number(i));

    if (current == 1) {
      res.push(arr.join(","));
      return;
    }

    for (let i = 0; i < current; i++) {
      response(arr, current - 1);
      if (current % 2 == 1) {
        let temp = arr[0];
        arr[0] = arr[current - 1];
        arr[current - 1] = temp;
      } else {
        let temp = arr[i];
        arr[i] = arr[current - 1];
        arr[current - 1] = temp;
      }
    }
    return res;
  }

  function sum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }
  function difference(arr1, arr2) {
    let dif = arr1 - arr2;
    if (dif < 0) {
      return dif * -1;
    }
    return dif;
  }

  nums = response(nums, nums.length);

  for (let i = 0; i <= nums.length - 1; i++) {
    let arr = separation(nums[i]);
    let arr1 = arr[0];
    let arr2 = arr[1];
    let sum1 = sum(arr1);
    let sum2 = sum(arr2);
    ans.push(difference(sum1, sum2));
  }
  res = [];
  return Array.min(ans);
}

Array.min = function (array) {
  return Math.min.apply(Math, array);
};





// ------- //

console.log(minimumAbsoluteDifference([3, 9, 7, 3]));
console.log(minimumAbsoluteDifference([-36, 36]));
console.log(minimumAbsoluteDifference([2, -1, 0, 4, -2, -9]));
