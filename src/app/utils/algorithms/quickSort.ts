// Action Types
interface Action {
    type: string;
    payload: any;
}

async function quickSort(arr: number[], start: number, end: number): Promise<Action[]> {
    let actions: Action[] = [];
    if (start < end) {
        let pivot = await partition(arr, start, end, actions);
        actions = actions.concat(await quickSort(arr, start, pivot - 1));
        actions = actions.concat(await quickSort(arr, pivot + 1, end));
    }
    return actions;
}

async function partition(arr: number[], start: number, end: number, actions: Action[]): Promise<number> {
    let pivotValue = arr[end];
    let pivotIndex = start;

    // Add action to set pivot index instead of calling setPivotIndex
    actions.push({ type: 'setPivot', payload: end });

    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            pivotIndex++;
            actions.push({ type: 'swap', payload: { indices: [i, pivotIndex], array: [...arr] } });
        }
    }

    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    actions.push({ type: 'swap', payload: { indices: [pivotIndex, end], array: [...arr] } });

    return pivotIndex;
}


export default quickSort;
