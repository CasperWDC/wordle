import React, { useState, useEffect } from "react";
import "./App.css";
import Grid from "./components/Grid/Grid";
import { useWordle } from "./hooks/useWordle";

const App = () => {
    const [solution, setSolution] = useState<string>("");
    const [isGameWon, setIsGameWon] = useState<boolean>(false);

    const fetchRandomWord = async () => {
        try {
            const response = await fetch("/words.txt");
            const text = await response.text();
            const words = text.split("\n").map((word) => word.trim()).filter((word) => word.length > 0);
            const randomWord = words[Math.floor(Math.random() * words.length)];
            setSolution(randomWord);
            setIsGameWon(false);
        } catch (error) {
            console.error("Error fetching words:", error);
        }
    };

    useEffect(() => {
        fetchRandomWord();
    }, []);

    const { guesses, currentGuess, handleInputChange, submitGuess, attemptsLeft, resetGame } = useWordle(solution);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentGuess === solution) {
            setIsGameWon(true);
        }
        submitGuess();
    };

    if (!solution) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <h1>Wordle</h1>
            <p>You have {attemptsLeft} guesses left.</p>
            <Grid guesses={guesses} solution={solution} />

            {isGameWon ? (
                <>
                    <p>🎉 Congratulations! You guessed the word!</p>
                    <button onClick={() => {
                        fetchRandomWord();
                        resetGame();
                    }}>Retry
                    </button>
                </>
            ) : attemptsLeft > 0 ? (
                <form onSubmit={handleSubmit}>
                <input
                        type="text"
                        value={currentGuess}
                        maxLength={solution.length}
                        onChange={(e) => handleInputChange(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <>
                    <p>Game over! The word was {solution}.</p>
                    <button onClick={fetchRandomWord}>Retry</button>
                </>
            )}
        </div>
    );
};

export default App;
