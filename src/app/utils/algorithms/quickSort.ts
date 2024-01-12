async function QuickSort(
    arr: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    playSwapSound: () => void,
    delay: number = 100 // Delay in milliseconds for visualization
): Promise<number[]> {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[arr.length - 1];
    const leftArr: number[] = [];
    const rightArr: number[] = [];

    for (let i = 0; i < arr.length - 1; i++) {
        // Play sound and update the visualization on each comparison
        playSwapSound();
        await new Promise((resolve) => setTimeout(resolve, delay)); // Delay for visualization

        if (arr[i] < pivot) {
            leftArr.push(arr[i]);
        } else {
            rightArr.push(arr[i]);
        }

        // Update the array state for visualization
        setArray([...leftArr, pivot, ...rightArr, ...arr.slice(leftArr.length + rightArr.length + 1)]);
    }

    // Recursively sort the left and right arrays
    const sortedLeftArr = await QuickSort(leftArr, setArray, playSwapSound, delay);
    const sortedRightArr = await QuickSort(rightArr, setArray, playSwapSound, delay);

    // Combine the sorted arrays and the pivot
    const sortedArray = [...sortedLeftArr, pivot, ...sortedRightArr];
    setArray(sortedArray); // Update the array state with the sorted array
    return sortedArray;
}

export default QuickSort;
