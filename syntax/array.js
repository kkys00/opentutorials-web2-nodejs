var arr = ['A', 'B', 'C', 'D']; //타입 상관없음
console.log(arr[1]); //0~
console.log(arr[3]);
arr[2] = 3;
console.log(arr);
console.log(arr.length);
arr.push('E');
console.log(arr);
arr.pop();
console.log(arr);