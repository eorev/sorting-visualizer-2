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

interface QuickSortAction {
    type: string;
    payload: any;
}

const SortingVisualizer: React.FC = () => {
    const [array, setArray] = useState<number[]>([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");
    const [currentSwappers, setCurrentSwappers] = useState<number[]>([]);
    const [pivotIndex, setPivotIndex] = useState<number | null>(null);
    const [isSorted, setIsSorted] = useState<boolean[]>(Array(50).fill(false));
    const [playSwapSound] = useSound(swapSound);
    const [isPaused, setIsPaused] = useState(false);
    const [delay, setDelay] = useState(100);
    const [isRunning, setIsRunning] = useState(false);
    const pauseRef = useRef(isPaused);
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
        setIsSorted(Array(50).fill(false)); // Correct usage
    };

    const addNotification = (text: string) => {
        setNotifications((prev) => [...prev, { id: uuidv4(), text }]);
    };

    const handleRunPauseResume = async () => {
        if (!selectedAlgorithm || array.length === 0 || isSorted.every((v) => v)) return;

        if (selectedAlgorithm === "quickSort") {
            if (!isRunning) {
                setIsRunning(true);
                setIsPaused(false);
                pauseRef.current = false;

                const actions = await QuickSort([...array], 0, array.length - 1);

                for (const action of actions) {
                    if (isPaused) break;
                    await handleAction(action);
                }

                setIsRunning(false);
                setIsPaused(false);
                setIsSorted(Array(array.length).fill(true)); // Mark all as sorted with an array of true
                addNotification("Sorting Completed!");
            } else if (isPaused) {
                setIsPaused(false);
                pauseRef.current = false;
            } else {
                setIsPaused(true);
                pauseRef.current = true;
            }
        }
    };

    const handleAction = async (action: QuickSortAction) => {
        switch (action.type) {
            case 'setPivot':
                setPivotIndex(action.payload);
                break;
            case 'swap':
                setCurrentSwappers(action.payload.indices);
                setArray(action.payload.array);
                playSwapSound();
                await new Promise(resolve => setTimeout(resolve, delay));
                break;
        }
    };


    const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAlgorithm(e.target.value);
        setIsSorted(Array(array.length).fill(false));
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
                    let backgroundColor = isSorted[index] ? "rgba(169, 92, 232, 0.8)" : // Sorted
                        currentSwappers.includes(index) ? "rgba(219, 57, 57, 0.8)" : // Swapping
                            (index === pivotIndex) ? "rgba(237, 234, 59, 0.8)" : // Pivot
                                "rgba(66, 134, 244, 0.8)"; // Default

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
