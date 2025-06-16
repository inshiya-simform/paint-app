import { Undo } from "../App";

export function isPresent(array: Undo[], rowIndex: number, colIndex: number) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].x === rowIndex && array[i].y === colIndex) {
      return true;
    }
  }
  return false;
}
