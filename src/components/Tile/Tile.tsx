import React from "react";
import styles from "./Tile.module.css";
import { TileProps } from "./Tile.types";

const Tile: React.FC<TileProps> = ({ value, isCorrect, isPresent }) => {
    const className = isCorrect ? styles.correct : isPresent ? styles.present : styles.incorrect;

    return <div className={`${styles.tile} ${className}`}>{value}</div>;
};

export default Tile;