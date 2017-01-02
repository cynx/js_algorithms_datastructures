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

