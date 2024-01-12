import React, { useState, useEffect } from 'react';
import QuickSort from '../utils/algorithms/quickSort';
import useSound from 'use-sound';
import swapSound from '../sounds/swap.mp3';

const SortingVisualizer: React.FC = () => {
    const [array, setArray] = useState<number[]>([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('');
    const [playSwapSound] = useSound(swapSound);

    useEffect(() => {
        generateRandomArray();
    }, []);

    const generateRandomArray = () => {
        const newArray = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100)); // Values up to 100
        setArray(newArray);
    };

    const runSortingAlgorithm = () => {
        if (selectedAlgorithm === 'quickSort') {
            QuickSort([...array], setArray, playSwapSound);
        }
    };

    return (
        <div className="p-4 bg-foreground h-screen flex flex-col">
            <div className="flex justify-center space-x-4 mb-4">
                <button className="bg-primary text-white p-2 rounded" onClick={generateRandomArray}>Generate Random Array</button>
                <select className="bg-primary text-white p-2 rounded" value={selectedAlgorithm} onChange={(e) => setSelectedAlgorithm(e.target.value)}>
                    <option value="">Select Algorithm</option>
                    <option value="quickSort">QuickSort</option>
                </select>
                <button className="bg-secondary text-white p-2 rounded" onClick={runSortingAlgorithm}>Run Algorithm</button>
            </div>
            <div className="flex-grow flex flex-row justify-start items-end bg-background border border-border overflow-hidden" style={{ height: '500px', flexWrap: 'nowrap' }}>
            {array.map((value, index) => {
                // Normalize the height to a percentage of the container's height
                const barHeight = (value / 100) * 100; // Assuming the maximum value is 100
                return (
                    <div key={index} className="flex flex-col items-center mx-1" style={{ width: `${100 / array.length}%`, height: `${barHeight}%`, backgroundColor: '#4deda1' }}>
                        <span className="text-xs text-white">{value}</span>
                    </div>
                );
            })}
        </div>
    </div>
    );
};

export default SortingVisualizer;