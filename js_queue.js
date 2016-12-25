/** A helper class to implement queue **/
class Queue {
    constructor() {
        this.items = [];
    }
    dequeue(){
        return this.items.shift();
    }
    enqueue(item){
        this.items.push(item);
    }
    front(){
        return this.items[0];
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

// (A) implementation of a normal queue
let normalQueue = new Queue();
normalQueue.enqueue('I went in first');
normalQueue.enqueue('I went in second');
normalQueue.enqueue('I went in third');
//kicking out first
normalQueue.dequeue();
//check queue
console.log(normalQueue);

// (B) implementation of a Priority Queue

class PriorityQueue extends Queue{
    constructor(){
        super();
    }
    //enqueue with priority
    enqueue(item){
        if (this.isEmtpy()){
            this.items.push(item);
        } else {
            let added=false;
            for (let i=0;i<this.items.length;i++){
                if(item.priority<this.items[i].priority){
                    this.items.splice(i,0,item);
                    added = true;
                    break;
                }
            }
            if (!added)
                this.items.push(item);
        }
    }
}


//example to test priority Queue
class PriorityObject{
    constructor(priority,item){
        this.priority = priority;
        this.item = item;
    }
}

let obj1 = new PriorityObject(2,"tea"),
    obj2 = new PriorityObject(1,"brush"),
    obj3 = new PriorityObject(5,"dinner"),
    obj4 = new PriorityObject(3,"lunch");

let priorityQueue = new PriorityQueue();

priorityQueue.enqueue(obj1);
priorityQueue.enqueue(obj2);
priorityQueue.enqueue(obj3);
priorityQueue.enqueue(obj4);

console.log(priorityQueue);

// (C) Circular Queue - Hot Potato
let hotPotato = (nameList,num)=>{
    let queue = new Queue();

    for(let i=0;i<nameList.length;i++){
        queue.enqueue(nameList[i]);
    }

    let eliminated="";
    while (queue.size()>1){
        for(let i=0;i<num;i++){
            queue.enqueue(queue.dequeue());
        }
        eliminated = queue.dequeue();
        console.log(`${eliminated} was eliminated from the game`);
    }
    return queue.dequeue();
};

let winner = hotPotato(['John','Nash','Chris','Ben','Kyle'],7);
console.log(winner);