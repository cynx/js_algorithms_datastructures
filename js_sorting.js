let Sorting = (function(){
    class Sorting{
        constructor(array){
            this.array = array;
            this._swap = this._swap.bind(this);
            this.toString = this.toString.bind(this);
        }

        _swap(index1,index2){
            [this.array[index1],this.array[index2]] = [this.array[index2],this.array[index1]];
        }

        toString(){
            return this.array.join();
        }

        bubbleSort(){
            let length = this.array.length;

            for (let i=0; i<length; i++){
                for (let j=0; j < length-1-i;j++){
                    if (this.array[j] > this.array[j+1]){
                        this._swap(j,j+1);
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
                    this._swap(i,indexMin);
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

    }

    return Sorting;
})();

let testArray = [5,3,1,2,4,6];
bubbleSort = new Sorting(testArray);
bubbleSort.insertionSort();
console.log(bubbleSort.toString());