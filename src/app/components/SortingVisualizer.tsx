import React, { useState, useEffect, useRef } from "react";
import QuickSort from "../utils/algorithms/quickSort";
import useSound from "use-sound";
import swapSound from "../sounds/swap.mp3";
import "@/app/globals.css";

const SortingVisualizer: React.FC = () => {
    const [array, setArray] = useState<number[]>([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");
    const [indices, setIndices] = useState<{ pivot: number; compared: number[] }>({ pivot: -1, compared: [] });
    const [playSwapSound] = useSound(swapSound);
    const [isPaused, setIsPaused] = useState(false);
    const [delay, setDelay] = useState(100);
    const [isRunning, setIsRunning] = useState(false); // Add a state to track if sorting is running
    const pauseRef = useRef(isPaused);

    useEffect(() => {
        pauseRef.current = isPaused;
    }, [isPaused]);

    useEffect(() => {
        generateRandomArray();
    }, []);

    const generateRandomArray = () => {
        const newArray = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));
        setArray(newArray);
    };

    const handleRunPauseResume = () => {
        if (!selectedAlgorithm || array.length === 0) return;

        if (selectedAlgorithm === "quickSort") {
            if (isRunning) {
                pauseRef.current = !pauseRef.current; // Update pause state reference
                setIsPaused(pauseRef.current);
            } else {
                setIsRunning(true);
                setIsPaused(false);
                pauseRef.current = false;
                QuickSort([...array], 0, array.length - 1, setArray, setIndices, playSwapSound, delay, pauseRef)
                    .then(() => {
                        setIsRunning(false);
                        setIsPaused(false);
                    });
            }
        }
    };


    return (
        <div className='p-4 bg-foreground flex flex-col' style={{ height: "calc(100vh - 2rem)" }}>
            <div className='flex justify-center space-x-4 mb-4'>
                <button className='bg-primary text-white p-2 rounded' onClick={generateRandomArray}>
                    Generate Random Array
                </button>
                <select className='bg-primary text-white p-2 rounded' value={selectedAlgorithm} onChange={(e) => setSelectedAlgorithm(e.target.value)}>
                    <option value=''>Select Algorithm</option>
                    <option value='quickSort'>QuickSort</option>
                </select>
                <button className='bg-secondary text-white p-2 rounded' onClick={handleRunPauseResume}>
                    {isRunning && !isPaused ? "Pause" : isRunning ? "Resume" : "Run Algorithm"}
                </button>
            </div>
            <div className='array--row w-full flex flex-row flex-wrap-nowrap overflow-auto' style={{ flexGrow: 1 }}>
                {array && array.map((value, index) => {
                    const barHeight = (value / 100) * 100;
                    let backgroundColor = "#4deda1";
                    if (index === indices.pivot) {
                        backgroundColor = "red";
                    } else if (indices.compared.includes(index)) {
                        backgroundColor = "blue";
                    }
                    return (
                        <div key={index} className='flex flex-col items-center mx-1' style={{ width: `${100 / array.length}%`, maxHeight: "100%", height: `${barHeight}%`, backgroundColor }}>
                            <span className='text-xs text-white'>{value}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SortingVisualizer;
