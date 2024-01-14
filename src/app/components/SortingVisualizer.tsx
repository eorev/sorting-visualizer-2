import React, { useState, useEffect, useRef } from "react";
import QuickSort from "../utils/algorithms/quickSort";
import useSound from "use-sound";
import swapSound from "../sounds/swap.mp3";
import "@/app/globals.css";
import SlideInNotifications from "./SlideInNotifications";
import { v4 as uuidv4 } from 'uuid';

interface AppNotification {
    id: string;
    text: string;
}

const SortingVisualizer: React.FC = () => {
    const [array, setArray] = useState<number[]>([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");
    const [indices, setIndices] = useState<{ pivot: number; compared: number[] }>({ pivot: -1, compared: [] });
    const [playSwapSound] = useSound(swapSound);
    const [isPaused, setIsPaused] = useState(false);
    const [delay, setDelay] = useState(100);
    const [isRunning, setIsRunning] = useState(false);
    const pauseRef = useRef(isPaused);
    const [isSorted, setIsSorted] = useState(false);
    const [notifications, setNotifications] = useState<AppNotification[]>([]);

    useEffect(() => {
        pauseRef.current = isPaused;
    }, [isPaused]);

    useEffect(() => {
        generateRandomArray();
    }, []);

    const generateRandomArray = () => {
        const newArray = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));
        setArray(newArray);
        setIsSorted(false); // Reset sorted state
    };

    const addNotification = (text: string) => {
        setNotifications((prev) => [...prev, { id: uuidv4(), text }]);
    };

    const handleRunPauseResume = () => {
        if (!selectedAlgorithm || array.length === 0 || isSorted) return;

        if (selectedAlgorithm === "quickSort") {
            if (!isRunning) {
                setIsRunning(true);
                setIsPaused(false);
                pauseRef.current = false;
                QuickSort([...array], 0, array.length - 1, setArray, setIndices, playSwapSound, delay, pauseRef)
                    .then(() => {
                        setIsRunning(false);
                        setIsPaused(false);
                        setIsSorted(true);
                        addNotification("Sorting Completed!");
                    });
            }
        }
    };

    const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAlgorithm(e.target.value);
        setIsSorted(false); // Reset sorted state
    };

    return (
        <div className='p-4 bg-foreground flex flex-col' style={{ height: "calc(100vh - 2rem)" }}>
            <SlideInNotifications notifications={notifications} setNotifications={setNotifications} />
            <div className='flex justify-center space-x-4 mb-4'>
                <button className='bg-primary text-white p-2 rounded' onClick={generateRandomArray}>
                    Generate Random Array
                </button>
                <select className='bg-primary text-white p-2 rounded' value={selectedAlgorithm} onChange={handleAlgorithmChange}>
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
