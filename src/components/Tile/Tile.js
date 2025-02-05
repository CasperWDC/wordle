import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./Tile.module.css";
const Tile = ({ value, isCorrect, isPresent }) => {
    const className = isCorrect ? styles.correct : isPresent ? styles.present : styles.incorrect;
    return _jsx("div", { className: `${styles.tile} ${className}`, children: value });
};
export default Tile;
