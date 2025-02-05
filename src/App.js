import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import "./App.css";
import Grid from "./components/Grid/Grid";
import { useWordle } from "./hooks/useWordle";
const App = () => {
    const [solution, setSolution] = useState("");
    const [isGameWon, setIsGameWon] = useState(false);
    const fetchRandomWord = async () => {
        try {
            const response = await fetch("/words.txt");
            const text = await response.text();
            const words = text.split("\n").map((word) => word.trim()).filter((word) => word.length > 0);
            const randomWord = words[Math.floor(Math.random() * words.length)];
            setSolution(randomWord);
            setIsGameWon(false);
        }
        catch (error) {
            console.error("Error fetching words:", error);
        }
    };
    useEffect(() => {
        fetchRandomWord();
    }, []);
    const { guesses, currentGuess, handleInputChange, submitGuess, attemptsLeft, resetGame } = useWordle(solution);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentGuess === solution) {
            setIsGameWon(true);
        }
        submitGuess();
    };
    if (!solution) {
        return _jsx("div", { children: "Loading..." });
    }
    return (_jsxs("div", { className: "App", children: [_jsx("h1", { children: "Wordle" }), _jsxs("p", { children: ["You have ", attemptsLeft, " guesses left."] }), _jsx(Grid, { guesses: guesses, solution: solution }), isGameWon ? (_jsxs(_Fragment, { children: [_jsx("p", { children: "\uD83C\uDF89 Congratulations! You guessed the word!" }), _jsx("button", { onClick: () => {
                            fetchRandomWord();
                            resetGame();
                        }, children: "Retry" })] })) : attemptsLeft > 0 ? (_jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { type: "text", value: currentGuess, maxLength: solution.length, onChange: (e) => handleInputChange(e.target.value) }), _jsx("button", { type: "submit", children: "Submit" })] })) : (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["Game over! The word was ", solution, "."] }), _jsx("button", { onClick: fetchRandomWord, children: "Retry" })] }))] }));
};
export default App;
