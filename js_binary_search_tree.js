let BinarySearchTree = (function(){

    class Node{
        constructor(key){
            this.key = key;
            this.left = null;
            this.right = null;
        }
    }

    const root = new WeakMap();

    class BinarySearchTree{
        constructor(){
            root.set(this,null);
            this._insertNode = this._insertNode.bind(this);
            this._searchNode = this._searchNode.bind(this);
            this._inOrderTraverse = this._inOrderTraverse.bind(this);
            this._preOrderTraverse = this._preOrderTraverse.bind(this);
            this._postOrderTraverse = this._postOrderTraverse.bind(this);
            this._minNode = this._minNode.bind(this);
            this._maxNode = this._maxNode.bind(this);
            this._removeNode = this._removeNode.bind(this);
            this._findMinNode = this._findMinNode.bind(this);
            this.getRoot = this.getRoot.bind(this);
        }

        insert(key){
            let newNode = new Node(key);

            if (this.getRoot() === null){
                root.set(this,newNode);
            } else {
                this._insertNode(this.getRoot(),newNode);
            }
        }

        _insertNode(node, newNode){
            if (newNode.key < node.key){
                if( node.left === null){
                    node.left = newNode;
                }else {
                    this._insertNode(node.left,newNode);
                }
            } else {
                if( node.right === null){
                    node.right = newNode;
                }else {
                    this._insertNode(node.right,newNode);
                }
            }
        }

        search(key){
            return this._searchNode(this.getRoot(),key);
        }

        _searchNode(node,key){
            if (node === null)
                return false;

            if (key < node.key){
                return this._searchNode(node.left,key);
            } else if (key > node.key){
                return this._searchNode(node.right,key);
            } else {
                return true;
            }
        }

        min(){
            return this._minNode(this.getRoot());
        }

        _minNode(node){
            if (node){
                while(node && node.left){
                    node = node.left;
                }
                return node.key;
            }
            return null;
        }

        max(){
            return this._maxNode(this.getRoot());
        }

        _maxNode(node){
            if (node){
                while(node && node.right){
                    node = node.right;
                }
                return node.key;
            }
            return null;
        }

        //left - root - right
        inOrderTraverse(callback){
            return this._inOrderTraverse(this.getRoot(),callback);
        }

        _inOrderTraverse(node,callback){
            if(node !== null){
                this._inOrderTraverse(node.left,callback);
                callback(node.key);
                this._inOrderTraverse(node.right,callback);
            }
        }

        //root - left - right
        preOrderTraverse(callback){
            return this._preOrderTraverse(this.getRoot(),callback);
        }

        _preOrderTraverse(node,callback){
            if(node !== null){
                callback(node.key);
                this._preOrderTraverse(node.left,callback);
                this._preOrderTraverse(node.right,callback);
            }
        }

        //left - right - root
        postOrderTraverse(callback){
            return this._postOrderTraverse(this.getRoot(),callback);
        }

        _postOrderTraverse(node,callback){
            if(node !== null){
                this._postOrderTraverse(node.left,callback);
                this._postOrderTraverse(node.right,callback);
                callback(node.key);
            }
        }

        remove(key){
            root.set(this,this._removeNode(this.getRoot(),key));
        }

        _removeNode(node,key){
            if (node === null){
                return null;
            }

            if (key < node.key){
                node.left = this._removeNode(node.left, key);
                return node;
            }else if (key > node.key){
                node.right = this._removeNode(node.right,key);
                return node;
            }else{
                //handle 3 cases

                //leaf node
                if (node.left == null && node.right == null){
                    node = null;
                    return node;
                }

                //1 child node
                if (node.left === null){
                    node = node.right;
                    return node;

                }else if (node.right === null){
                    node = node.left;
                    return node;
                }

                //2 child
                let aux = this._findMinNode(node.right);
                node.key = aux.key;
                node.right = this._removeNode(node.right,aux.key);
                return node;

            }

        }

        _findMinNode(node){
            while(node && node.left !== null){
                node = node.left;
            }
            return node;
        }

        getRoot(){
            return root.get(this);
        }

    }

    return BinarySearchTree;

})();


let BST = new BinarySearchTree();
BST.insert(11);
BST.insert(4);
BST.insert(5);
BST.insert(12);
BST.insert(13);
BST.insert(17);
BST.insert(14);
BST.insert(18);

console.log(BST.getRoot());
console.log(BST.search(12));
BST.inOrderTraverse(value=>{console.log('in:'+value)});
BST.preOrderTraverse(value=>{console.log('pre:'+value)});
BST.postOrderTraverse(value=>{console.log('post:'+value)});
console.log(BST.min());
console.log(BST.max());
BST.remove(17);
