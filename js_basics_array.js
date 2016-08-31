/** Fibonacci number (F10 = 55) **/
let fibonacciNumber = index => {
  let a=0,b=1,temp;
  while (index>1){
    temp=b;
    b=b+a;
    a=temp;
    index--;
  }
  return b;
};

console.log('Fibonacci Number: '+fibonacciNumber(10));

/** Fibonacci series (Fn = Fn-1 + Fn-2) **/
let fibonacciSeries = index => {
  let a=0,b=1,temp,fbArray=[0,1];
  while (index>1){
    temp=b;
    b=b+a;
    a=temp;
    fbArray.push(b);
    index--;
  }
  return fbArray.join(',');
};

console.log('Fibonacci Series: '+fibonacciSeries(10));

/** Flatten an array **/
let nestedArray = [[1,2],[3,4],[12,34],[2,5],[7,89]];
let flattenArray = arr => {
  return arr.reduce((previousValue,nextValue) =>{
     return previousValue.concat(nextValue);
  });
};

console.log('Flattened Array: '+flattenArray(nestedArray));

/** Array - sorting numbers **/
let numericArray = [1,10,3,33,2,4,7,15,9];
let sortNumberCallback = (a,b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0; //if a==b;
};

console.log(numericArray.sort(sortNumberCallback));

/** Array - sorting strings **/
let stringArray = ['anna','ben','zora','Clen','Aura','Matt','BOND'];
let sortStringCallback = (a,b) => {
  if (a.toLowerCase() < b.toLowerCase()) return -1;
  if (a.toLowerCase() > b.toLowerCase()) return 1;
  return 0; //if a==b;
};

console.log(stringArray.sort(sortStringCallback));

/** Array - sorting objects on a property **/
let arrayOfObj = [{
  'name':'john',
  'age':45
},{
  'name':'kyle',
  'age':15
},{
  'name':'ammy',
  'age':35
}];
let sortOjbCallback = (a,b) => {
  if (a.age < b.age) return -1;
  if (a.age > b.age) return 1;
  return 0; //if a==b;
};

console.log(arrayOfObj.sort(sortOjbCallback));