import React from "react";
import Tile from "../Tile/Tile";
import { GridProps } from "./Grid.types";
import styles from "./Grid.module.css";

const Grid: React.FC<GridProps> = ({ guesses, solution }) => {
    return (
        <div className={styles.grid}>
            {guesses.map((guess, rowIndex) => {
                const solutionList = solution.split("");
                const guessList = guess.split("");
                const result = new Array(solution.length).fill("gray"); // Изначально все буквы серые
                const solutionRemaining: (string | null)[] = [...solutionList];

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

                return (
                    <div className={styles.row} key={rowIndex}>
                        {guessList.map((char, colIndex) => (
                            <Tile
                                key={colIndex}
                                value={char}
                                isCorrect={result[colIndex] === "green"}
                                isPresent={result[colIndex] === "yellow"}
                                data-present={result[colIndex] === "yellow" ? "true" : "false"} // Устанавливаем атрибут
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default Grid;
