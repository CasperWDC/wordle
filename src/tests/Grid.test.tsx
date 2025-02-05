import { render, screen } from "@testing-library/react";
import Grid from "../components/Grid/Grid";
import '@testing-library/jest-dom';

// Мок компонента Tile, чтобы избежать рендера всей структуры
jest.mock("../components/Tile/Tile", () => ({ value, isCorrect, isPresent }: any) => (
    <div data-testid="tile" data-value={value} data-correct={isCorrect} data-present={isPresent} />
));

describe("Grid Component", () => {
    test("renders correct number of rows", () => {
        const guesses = ["apple", "grape"];
        const solution = "apple";

        render(<Grid guesses={guesses} solution={solution} />);

        // Ожидаем, что будет 2 строки, так как две попытки
        const rows = screen.getAllByTestId("tile");
        expect(rows.length).toBe(guesses.join("").length);
    });

    test("renders correct tile states", () => {
        const guesses = ["apple"];
        const solution = "apple";

        render(<Grid guesses={guesses} solution={solution} />);

        const tiles = screen.getAllByTestId("tile");
        tiles.forEach((tile) => {
            expect(tile).toHaveAttribute("data-correct", "true"); // Все буквы правильные
        });
    });

    test('handles incorrect and present letters', () => {
        const guesses = ["apple", "grape"];
        const solution = "grape";

        const { getAllByTestId } = render(<Grid guesses={guesses} solution={solution} />);
        const tiles = getAllByTestId('tile'); // Используйте testId, если необходимо

        // Проверяем, что буквы 'p' и 'e' отмечены как "present" (жёлтые)
        expect(tiles[2]).toHaveAttribute("data-present", "true");
        expect(tiles[4]).toHaveAttribute("data-present", "true");
    });
});
