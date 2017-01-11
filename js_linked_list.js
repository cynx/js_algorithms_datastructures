//Linked List

let LinkedList =   (function(){

     class Node{
         constructor(element){
             this.element = element;
             this.next = null;
         }
     }

     const length = new WeakMap();
     const head = new WeakMap();


     class LinkedList{
         constructor(){
             length.set(this,0);
             head.set(this,null);
         }

         append(element){
             let node = new Node(element), current;

             //check for first node on the lsit
             if (this.getHead() === null){
                 head.set(this,node);
             } else {
                 current = this.getHead();

                 //loop until find last
                 while (current.next){
                     current = current.next;
                 }

                 //get the last item and assign it
                 current.next = node;
             }

             //update list size
             let l = this.size();
             l++;
             length.set(this,l);
         }

         insert(position,element){
             //check for position bound
             if(position>=0 && position<=this.size()){
                let node = new Node(element),
                    current = this.getHead(),
                    previous,
                    index=0;

                if (position === 0){
                    //add at first position
                    node.next = current;
                    head.set(this,node);
                }else{
                    while (index++ < position) {
                        previous = current;
                        current = current.next;
                    }
                    node.next = current;
                    previous.next = node;
                }

                 //update size of list
                 let l = this.size();
                 l++;
                 length.set(this, l);

                 return true;


             }else{
                 return false;
             }
         }

         removeAt(position){
             if (position > -1 && position < this.size()) {
                let current = this.getHead(),
                    previous,
                    index=0;

                if (position === 0){
                    //remove first item
                    head.set(this,current.next);
                }else{
                    while (index++ < position) {

                        previous = current;
                        current = current.next;
                    }

                    //link previous with current's next - skip it to remove
                    previous.next = current.next;
                }

                 let l = this.size();
                 l--;
                 length.set(this, l);

                 return current.element;

             }else{
                 return null;
             }
         }

         remove(element) {

             let index = this.indexOf(element);
             return this.removeAt(index);
         }

         indexOf(element) {

             let current = this.getHead(),
                 index = 0;

             while (current) {
                 if (element === current.element) {
                     return index;
                 }
                 index++;
                 current = current.next;
             }

             return -1;
         }

         getHead(){
             return head.get(this);
         }

         size(){
             return length.get(this);
         }

         isEmpty(){
             return  this.size() === 0;
         }

         print(){
             console.log(this.toString());
         }

         toString() {

             let current = this.getHead(),
                 string = '';

             while (current) {
                 string += current.element + (current.next ? ', ' : '');
                 current = current.next;
             }
             return string;

         }
     }

     return LinkedList;

 })();

//examples
 let list = new LinkedList();
 list.append(9);
 list.print();
 list.insert(1,12);
 list.print();
 list.insert(1,10);
 list.print();
 list.removeAt(1);
 list.print();
 list.remove(9);
 list.print();


 //Doubly linked List

let DoublyLinkedList =   (function(){

    class Node{
        constructor(element){
            this.element = element;
            this.next = null;
            this.previous = null;
        }
    }

    const length = new WeakMap();
    const head = new WeakMap();
    const tail = new WeakMap();


    class DoublyLinkedList{
        constructor(){
            length.set(this,0);
            head.set(this,null);
            tail.set(this,null);
        }

        append(element){
            let node = new Node(element), _tail;

            //check for first node on the list
            if (this.getHead() === null){
                head.set(this,node);
                tail.set(this,node);
            } else {
                _tail = this.getTail();
                _tail.next = node;
                node.previous = _tail;
                tail.set(this,node);
            }

            //update list size
            let l = this.size();
            l++;
            length.set(this,l);
        }

        insert(position,element){
            //check for position bound
            if(position>=0 && position<=this.size()){
                let node = new Node(element),
                    current = this.getHead(),
                    previous,
                    index=0;

                if (position === 0){
                    if (!current){
                        head.set(this,node);
                        tail.set(this,node);
                    }else{
                        //add at first position
                        node.next = current;
                        current.previous = node;
                        head.set(this,node);
                    }

                }else if(position === this.size()){
                    current = tail;
                    current.next = node;
                    node.previous = current;
                    tail.set(this,node);
                }else{
                    while (index++ < position) {
                        previous = current;
                        current = current.next;
                    }
                    node.next = current;
                    current.previous = node;

                    previous.next = node;
                    node.previous = previous;

                }

                //update size of list
                let l = this.size();
                l++;
                length.set(this, l);

                return true;


            }else{
                return false;
            }
        }

        removeAt(position){
            if (position > -1 && position < this.size()) {
                let _head = this.getHead(),
                    _tail = this.getTail(),
                    current = _head,
                    previous,
                    index=0;

                if (position === 0){
                    _head = current.next; // {1}

                    //if there is only one item, then we update tail as well //NEW
                    if (this.size() === 1) { // {2}
                        _tail = null;
                    } else {
                        _head.previous = null; // {3}
                    }
                }else if(position === this.size()-1){
                    current = _tail; // {4}
                    _tail = current.previous;
                    _tail.next = null;
                }else{
                    while (index++ < position) {

                        previous = current;
                        current = current.next;
                    }

                    //link previous with current's next - skip it to remove
                    previous.next = current.next;
                    current.next.previous = previous;
                }

                head.set(this,_head);
                tail.set(this,_tail);

                let l = this.size();
                l--;
                length.set(this, l);

                return current.element;

            }else{
                return null;
            }
        }

        remove(element) {

            let index = this.indexOf(element);
            return this.removeAt(index);
        }

        indexOf(element) {
            let current = this.getHead(),
                index = -1;

            //check first item
            if (element == current.element) {
                return 0;
            }

            index++;

            //check in the middle of the list
            while (current.next) {

                if (element == current.element) {
                    return index;
                }

                current = current.next;
                index++;
            }

            //check last item
            if (element == current.element) {
                return index;
            }

            return -1;

        }

        getHead(){
            return head.get(this);
        }

        getTail(){
            return tail.get(this);
        }

        size(){
            return length.get(this);
        }

        isEmpty(){
            return  this.size() === 0;
        }

        print(){
            console.log(this.toString());
        }
        printInverse() {
            console.log(this.inverseToString());
        }

        toString() {

            let current = this.getHead(),
                s = current ? current.element : '';

            while (current && current.next) {
                current = current.next;
                s += ', ' + current.element;
            }

            return s;

        }
        inverseToString() {

            let current = this.getTail(),
                s = current ? current.element : '';

            while (current && current.previous) {
                current = current.previous;
                s += ', ' + current.element;
            }

            return s;
        }
    }

    return DoublyLinkedList;

})();

//examples for Doubly linked list
let doublyList = new DoublyLinkedList();
doublyList.append(2);
doublyList.print();
doublyList.insert(0,12);
doublyList.print();
doublyList.printInverse();
doublyList.insert(1,99);
doublyList.print();
doublyList.removeAt(1);
doublyList.print();
doublyList.remove(12);
doublyList.printInverse();


//Circular Linked List

let CircularLinkedList =   (function(){

    class Node{
        constructor(element){
            this.element = element;
            this.next = null;
        }
    }

    const length = new WeakMap();
    const head = new WeakMap();


    class CircularLinkedList{
        constructor(){
            length.set(this,0);
            head.set(this,null);
        }

        append(element){
            let node = new Node(element), current;

            //check for first node on the lsit
            if (this.getHead() === null){
                head.set(this,node);
            } else {
                current = this.getHead();

                //loop until find last
                while (current.next !== this.getHead()){
                    current = current.next;
                }

                //get the last item and assign it
                current.next = node;
            }

            //set node.next to head - to have circular list
            node.next = this.getHead();

            //update list size
            let l = this.size();
            l++;
            length.set(this,l);
        }

        insert(position,element){
            //check for position bound
            if(position>=0 && position<=this.size()){
                let node = new Node(element),
                    current = this.getHead(),
                    previous,
                    index=0;

                if (position === 0){
                    if(!this.getHead()) { // if no node  in list
                        head.set(this, node);
                        node.next = this.getHead();
                    } else {
                        node.next = current;
                        //update last element
                        while(current.next !== this.getHead()) { //last element will be head instead of NULL
                            current = current.next;
                        }
                        head.set(this, node);
                        current.next = this.getHead();
                    }
                }else{
                    while (index++ < position) {
                        previous = current;
                        current = current.next;
                    }
                    node.next = current;
                    previous.next = node;
                }

                //update size of list
                let l = this.size();
                l++;
                length.set(this, l);

                return true;


            }else{
                return false;
            }
        }

        removeAt(position){
            if (position > -1 && position < this.size()) {
                let current = this.getHead(),
                    previous,
                    index=0;

                if (position === 0){
                    while (current.next !== this.getHead()) { //needs to update last element first
                        current = current.next;
                    }

                    head.set(this, this.getHead().next);
                    current.next = this.getHead();
                }else{
                    while (index++ < position) {

                        previous = current;
                        current = current.next;
                    }

                    //link previous with current's next - skip it to remove
                    previous.next = current.next;
                }

                let l = this.size();
                l--;
                length.set(this, l);

                return current.element;

            }else{
                return null;
            }
        }

        remove(element) {

            let index = this.indexOf(element);
            return this.removeAt(index);
        }

        indexOf(element) {

            let current = this.getHead(),
                index = -1;

            //check first item
            if (element == current.element) {
                return 0;
            }

            index++;

            //check in the middle of the list
            while (current.next !== this.getHead()) {

                if (element == current.element) {
                    return index;
                }

                current = current.next;
                index++;
            }

            //check last item
            if (element == current.element) {
                return index;
            }

            return -1;
        }

        getHead(){
            return head.get(this);
        }

        size(){
            return length.get(this);
        }

        isEmpty(){
            return  this.size() === 0;
        }

        print(){
            console.log(this.toString());
        }

        toString() {

            let current = this.getHead(),
                s = current.element;

            while (current.next !== this.getHead()) {
                current = current.next;
                s += ', ' + current.element;
            }

            return s.toString();

        }
    }

    return CircularLinkedList;

})();

//examples
let circularList = new CircularLinkedList();
circularList.append(33);
circularList.append(32);
circularList.print();
circularList.insert(0,12);
circularList.print();
circularList.remove(12);
circularList.removeAt(0);
circularList.print();

//export for hash
module.exports = LinkedList;