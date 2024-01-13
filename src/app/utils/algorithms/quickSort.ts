async function QuickSort(
    arr: number[],
    start: number,
    end: number,
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    setIndices: React.Dispatch<React.SetStateAction<{ pivot: number, compared: number[] }>>,
    playSwapSound: () => void,
    delay: number,
    pauseRef: React.MutableRefObject<boolean>
) {
    if (start < end) {
        let pivot = await partition(arr, start, end, setArray, setIndices, playSwapSound, delay, pauseRef);
        if (pauseRef.current) return;  // Check if paused between recursive calls
        await QuickSort(arr, start, pivot - 1, setArray, setIndices, playSwapSound, delay, pauseRef);
        if (pauseRef.current) return;  // Check if paused between recursive calls
        await QuickSort(arr, pivot + 1, end, setArray, setIndices, playSwapSound, delay, pauseRef);
    }
}

async function partition(
    arr: number[],
    start: number,
    end: number,
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    setIndices: React.Dispatch<React.SetStateAction<{ pivot: number, compared: number[] }>>,
    playSwapSound: () => void,
    delay: number,
    pauseRef: React.MutableRefObject<boolean>
) {
    let pivotValue = arr[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
        while (pauseRef.current) {  // Pause logic
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        if (arr[i] < pivotValue) {
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]]; // Swap if element is less than pivot
            pivotIndex++;
            playSwapSound();
            setArray([...arr]);
            setIndices({ pivot: end, compared: [i] });
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]; // Swap the pivot to its correct position
    setArray([...arr]);
    return pivotIndex;
}

export default QuickSort;
