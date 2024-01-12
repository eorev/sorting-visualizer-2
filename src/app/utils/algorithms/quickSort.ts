async function QuickSort(
    arr: number[],
    start: number,
    end: number,
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    setIndices: React.Dispatch<React.SetStateAction<{ pivot: number, compared: number[] }>>,
    playSwapSound: () => void,
    delay: number = 100
) {
    if (start < end) {
        let pivot = await partition(arr, start, end, setArray, setIndices, playSwapSound, delay);
        await QuickSort(arr, start, pivot - 1, setArray, setIndices, playSwapSound, delay);
        await QuickSort(arr, pivot + 1, end, setArray, setIndices, playSwapSound, delay);
    }
}

async function partition(
    arr: number[],
    start: number,
    end: number,
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    setIndices: React.Dispatch<React.SetStateAction<{ pivot: number, compared: number[] }>>,
    playSwapSound: () => void,
    delay: number
) {
    let pivotValue = arr[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
        setIndices({ pivot: end, compared: [i] });
        if (arr[i] < pivotValue) {
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            pivotIndex++;
            playSwapSound();
            setArray([...arr]);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    setArray([...arr]);
    return pivotIndex;
}

export default QuickSort;