let Set = (function(){
    const items = new WeakMap();

    class Set{
        constructor(){
            items.set(this,{});
        }

        add(value){
            if (!this.has(value)){
                let _items = items.get(this);
                _items[value] = value;
                return true;
            }
            return false;
        }

        delete(value){
            if (this.has(value)){
                let _items = items.get(this);
                delete _items[value];
                return true;
            }
            return false;
        }


        has(value){
            let _items = items.get(this);
            return _items.hasOwnProperty(value);
        }

        clear(){
            items.set(this,{});
        }

        size(){
            let _items = items.get(this);
            return Object.keys(_items).length;
        }

        getItems(){
            return items.get(this);
        }

        values(){
            let values = [];
            let _items = items.get(this);
            for (let i=0, keys=Object.keys(_items); i<keys.length; i++) {
                values.push(_items[keys[i]]);
            }
            return values;
        }

        union(otherSet){
            let unionSet = new Set();

            let values = this.values();
            for(let i=0;i<values.length;i++){
                unionSet.add(values[i]);
            }

            values = otherSet.values();
            for (let i=0; i<values.length; i++){
                unionSet.add(values[i]);
            }

            return unionSet;
        }

        intersection(otherSet){
            let intersectionSet = new Set();

            let values = this.values();
            for (let i=0; i<values.length; i++){
                if (otherSet.has(values[i])){
                    intersectionSet.add(values[i]);
                }
            }

            return intersectionSet;
        }

        difference(otherSet){
            let differenceSet = new Set();

            let values = this.values();
            for (let i=0; i<values.length; i++){
                if (!otherSet.has(values[i])){
                    differenceSet.add(values[i]);
                }
            }

            return differenceSet;
        }

        subset(otherSet){

            if (this.size() > otherSet.size()){
                return false;
            } else {
                let values = this.values();
                for (let i=0; i<values.length; i++){
                    if (!otherSet.has(values[i])){
                        return false;
                    }
                }
                return true;
            }
        }
    }

    return Set;
})();


//examples
//Union
let setA = new Set(),
    setB = new Set();

setA.add(1);
setA.add(2);
setA.add(3);

setB.add(4);
setB.add(5);
setB.add(6);

let unionAB = setA.union(setB);
console.log(unionAB.values());

//Intersection and Difference
setA = new Set();
setB = new Set();

setA.add(1);
setA.add(2);
setA.add(3);

setB.add(3);
setB.add(4);
setB.add(5);

let intersectionAB = setA.intersection(setB);
console.log(intersectionAB.values());

let differenceAB = setA.difference(setB);
let differenceBA = setB.difference(setA);
console.log(differenceAB.values());
console.log(differenceBA.values());

//subset
setA = new Set();
setB = new Set();

setA.add(1);
setA.add(2);
setA.add(3);

setB.add(1);
setB.add(2);
setB.add(3);
setB.add(4);

let isAsubsetB = setA.subset(setB);
console.log(`is A subset B: ${isAsubsetB}`);

