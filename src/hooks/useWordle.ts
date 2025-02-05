import { useState } from "react";

export const useWordle = (solution: string) => {
    const [guesses, setGuesses] = useState<string[]>([]);
    const [currentGuess, setCurrentGuess] = useState<string>("");
    const [attemptsLeft, setAttemptsLeft] = useState<number>(5);

    const handleInputChange = (value: string) => {
        if (value.length <= solution.length) {
            setCurrentGuess(value);
        }
    };

    const submitGuess = () => {
        if (currentGuess.length === solution.length && attemptsLeft > 0) {
            setGuesses([...guesses, currentGuess]);
            setCurrentGuess("");
            setAttemptsLeft(attemptsLeft - 1);
        }
    };

    const resetGame = () => {
        setGuesses([]);
        setCurrentGuess("");
        setAttemptsLeft(5);
    };

    return {
        guesses,
        currentGuess,
        handleInputChange,
        submitGuess,
        attemptsLeft,
        resetGame, // возвращаем resetGame, чтобы использовать в App.tsx
    };
};
