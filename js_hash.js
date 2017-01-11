//import linked list
let LinkedList = require('./js_linked_list');

class ValuePair{
    constructor(key, value){
        this.key = key;
        this.value = value;
    }
    toString() {
        return '[' + this.key + ' - ' + this.value + ']';
    }
}

//Separate Chaining Hash implementation
class HashTableSeparateChaining {
    constructor(){
        this.table = [];

        this._loseloseHashCode = this._loseloseHashCode.bind(this);
        this._djb2HashCode = this._djb2HashCode.bind(this);
        this._hashCode = this._hashCode.bind(this);
    }

    _loseloseHashCode(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % 37;
    }

    _djb2HashCode(key) {
        let hash = 5381;
        for (let i = 0; i < key.length; i++) {
            hash = hash * 33 + key.charCodeAt(i);
        }
        return hash % 1013;
    }

    _hashCode(key){
        return this._djb2HashCode(key);
    }

    put(key,value){
        let position = this._hashCode(key);
        console.log(position + ' - ' + key);

        if (this.table[position] == undefined) {
            this.table[position] = new LinkedList();
        }
        this.table[position].append(new ValuePair(key, value));
    }

    get(key){
        let position = this._hashCode(key);

        if (this.table[position] !== undefined  && !this.table[position].isEmpty()){

            //iterate linked list to find key/value
            let current = this.table[position].getHead();

            do {
                if (current.element.key === key){
                    return current.element.value;
                }
                current = current.next;
            } while(current);
        }
        return undefined;
    }

    remove(key){
        let position = this._hashCode(key);

        if (this.table[position] !== undefined){

            //iterate linked list to find key/value
            let current = this.table[position].getHead();

            do {
                if (current.element.key === key){
                    this.table[position].remove(current.element);
                    if (this.table[position].isEmpty()){
                        this.table[position] = undefined;
                    }
                    return true;
                }
                current = current.next;
            } while(current);
        }

        return false;
    }

    print(){
        for (let i = 0; i < this.table.length; ++i) {
            if (this.table[i] !== undefined) {
                console.log(this.table[i].toString());
            }
        }
    }
}

//examples of hashSC
let hashSC = new HashTableSeparateChaining();
hashSC.put('ron','ron@email.com');
hashSC.put('jenny','jenny@email.com');
hashSC.print();

console.log(hashSC.get('jenny'));
hashSC.remove('ron');
hashSC.print();

//Linear Probing Hash implementation
class HashTableLinearProbing extends HashTableSeparateChaining {
    constructor(){
        super();
    }

    put(key,value){
        let position = this._hashCode(key);
        console.log(position + ' - ' + key);

        if (this.table[position] == undefined) {
            this.table[position] = new ValuePair(key, value);
        } else {
            let index = ++position;
            while (this.table[index] != undefined){
                index++;
            }
            this.table[index] = new ValuePair(key, value);
        }
    }

    get(key){
        let position = this._hashCode(key);

        if (this.table[position] !== undefined){
            if (this.table[position].key === key) {
                return this.table[position].value;
            } else {
                let index = ++position;
                while (this.table[index] !== undefined && (this.table[index] && this.table[index].key !== key)){
                    index++;
                }
                if (this.table[index] && this.table[index].key === key) {
                    return this.table[index].value;
                }
            }
        }
        return undefined;
    }

    remove(key){
        let position = this._hashCode(key);

        if (this.table[position] !== undefined){
            if (this.table[position].key === key) {
                this.table[position] = undefined;
            } else {
                let index = ++position;
                while (this.table[index] === undefined || this.table[index].key !== key){
                    index++;
                }
                if (this.table[index].key === key) {
                    this.table[index] = undefined;
                }
            }
        }
    }

    print(){
        for (let i = 0; i < this.table.length; ++i) {
            if (this.table[i] !== undefined) {
                console.log(i + ' -> ' + this.table[i].toString());
            }
        }
    }
}

let hashLP = new HashTableLinearProbing();
console.log('***linearProbing***');
hashLP.put('shiv','shiv@email.com');
hashLP.put('reed','reed@gmail.com');
hashLP.put('slee','slee@gmail.com');

console.log(hashLP.get('reed'));
hashLP.remove('reed');
hashLP.print();


