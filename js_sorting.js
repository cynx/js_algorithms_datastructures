let Sorting = (function(){
    class Sorting{
        constructor(array){
            this.array = array;
            this._swap = this._swap.bind(this);
            this.toString = this.toString.bind(this);
            this._mergeSortHelper = this._mergeSortHelper.bind(this);
            this._merge = this._merge.bind(this);
            this._partition = this._partition.bind(this);
            this._quick = this._quick.bind(this);
            this.quickSort = this.quickSort.bind(this);
        }

        _swap(array,index1,index2){
            [array[index1],array[index2]] = [array[index2],array[index1]];
        }

        toString(){
            return this.array.join();
        }

        bubbleSort(){
            let length = this.array.length;

            for (let i=0; i<length; i++){
                for (let j=0; j < length-1-i;j++){
                    if (this.array[j] > this.array[j+1]){
                        this._swap(this.array,j,j+1);
                    }
                }
            }
        }

        selectionSort(){
            let length = this.array.length,
                indexMin;

            for (let i=0; i<length-1; i++){
                indexMin=i;
                for (let j=i; j<length;j++){
                    if (this.array[indexMin]>this.array[j]){
                        indexMin=j;
                    }
                }
                if (i !== indexMin){
                    this._swap(this.array, i,indexMin);
                }
            }
        }

        insertionSort(){
            let length = this.array.length,j,temp;
            for (let i=1;i<length;i++){
                j=i;
                temp = this.array[i];
                while(j>0 && this.array[j-1] > temp){
                    this.array[j] = this.array[j-1];
                    j--;
                }
                this.array[j] = temp;
            }
        }

        mergeSort(){
            this.array = this._mergeSortHelper(this.array);
        }

        _mergeSortHelper(array){
            let length = array.length;

            if (length < 2){
                return array;
            }

            let mid = Math.floor(length/2),
                left = array.slice(0,mid),
                right = array.slice(mid,length);

            return this._merge(this._mergeSortHelper(left),this._mergeSortHelper(right));
        }

        _merge(left,right){
            let result=[];

            while (left.length && right.length){
                if (left[0] < right[0]){
                    result.push(left.shift());
                }else {
                    result.push(right.shift());
                }
            }

            while(left.length){
                result.push(left.shift());
            }

            while(right.length){
                result.push(right.shift());
            }

            return result;
        }

        quickSort(){
            this._quick(this.array,0, this.array.length-1);
        }

        _partition(array,left,right){
            let pivot = array[Math.floor((right+left)/2)],
                i = left,
                j = right;

            while(i <= j){
                while(array[i]< pivot){
                    i++;
                }
                while(array[j]>pivot){
                    j--;
                }
                if (i <= j){
                    this._swap(array,i,j);
                    i++;
                    j--;
                }

            }

            return i;
        }

        _quick(array,left,right){
            let index;

            if (array.length > 1){
                index = this._partition(array,left,right);

                if (left < index - 1){
                    this._quick(array,left,index-1);
                }

                if (index < right){
                    this._quick(array,index,right);
                }
            }
            return array;
        }

        binarySearch(item){
            this.quickSort();

            let low = 0, high = this.array.length - 1,
                mid, element;

            while( low <= high ){
                mid = Math.floor((low + high) / 2);
                element = this.array[mid];

                if (element < item){
                    low = mid + 1;
                }else if (element > item){
                    high = mid - 1;
                } else {
                    return mid;
                }
            }

            return -1;

        }
    }

    return Sorting;
})();

let testArray = [5,3,1,2,4,6];
bubbleSort = new Sorting(testArray);
bubbleSort.quickSort();
console.log(bubbleSort.toString());