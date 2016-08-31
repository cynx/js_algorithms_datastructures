/** A helper class to implement stack **/
class Stack {
    constructor() {
        this.items = [];
    }
    pop(){
        return this.items.pop();
    }
    push(item){
        this.items.push(item);
    }
    peek(){
        return this.items[this.items.length-1];
    }
    isEmtpy(){
        return this.items.length==0;
    }
    size(){
        return this.items.length;
    }
    clear(){
        this.items = [];
    }

}

/** testing the stack **//**
let stackItems = new Stack();
stackItems.push('233');
stackItems.push('232');
stackItems.push('2asd');
console.log(stackItems.pop());
console.log(stackItems.peek());
console.log(stackItems.size());
console.log(stackItems.isEmtpy());
stackItems.clear();
console.log(stackItems.isEmtpy());
**/

/** implementing base converter to use stack concept. Converts decimal to binary for base of 2,8 or 16 **/
let baseConvertor = (decimalNumber, base) => {
    let remainderStack = new Stack(), remainder, baseString = '',
        digits = '0123456789ABCDEF';

    while (decimalNumber > 0){
        remainder = Math.floor(decimalNumber % base);
        remainderStack.push(remainder);
        decimalNumber = Math.floor(decimalNumber / base);
    }

    while (!remainderStack.isEmtpy()){
        baseString += digits[remainderStack.pop()];
    }

    return baseString;
};

console.log('Binary: '+baseConvertor(10023,2));
console.log('Octal: '+baseConvertor(10023,8));
console.log('Hex: '+baseConvertor(10023,16));