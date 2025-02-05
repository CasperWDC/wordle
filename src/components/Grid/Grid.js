import { jsx as _jsx } from "react/jsx-runtime";
import Tile from "../Tile/Tile";
import styles from "./Grid.module.css";
const Grid = ({ guesses, solution }) => {
    return (_jsx("div", { className: styles.grid, children: guesses.map((guess, rowIndex) => {
            const solutionList = solution.split("");
            const guessList = guess.split("");
            const result = new Array(solution.length).fill("gray"); // Изначально все буквы серые
            const solutionRemaining = [...solutionList];
            // Первый проход — находим правильные буквы
            guessList.forEach((char, index) => {
                if (char === solutionList[index]) {
                    result[index] = "green"; // Буква на правильном месте — зелёная
                    solutionRemaining[index] = null; // Эта буква больше не учитывается
                }
            });
            // Второй проход — находим буквы, которые присутствуют в слове, но не на правильном месте
            guessList.forEach((char, index) => {
                if (result[index] === "gray" && solutionRemaining.includes(char)) {
                    result[index] = "yellow"; // Буква присутствует, но на неправильном месте — жёлтая
                    solutionRemaining[solutionRemaining.indexOf(char)] = null; // Эта буква больше не учитывается
                }
            });
            return (_jsx("div", { className: styles.row, children: guessList.map((char, colIndex) => (_jsx(Tile, { value: char, isCorrect: result[colIndex] === "green", isPresent: result[colIndex] === "yellow", "data-present": result[colIndex] === "yellow" ? "true" : "false" }, colIndex))) }, rowIndex));
        }) }));
};
export default Grid;
