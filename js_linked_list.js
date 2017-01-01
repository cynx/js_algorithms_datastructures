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
     }

     return LinkedList;

 })();

 //example
 let list = new LinkedList();
 list.append(11);
 list.append(1);