import "./App.css";
import Canvas from "./components/Canvas/Canvas";
import { ChangeEvent, useCallback, useState } from "react";
import { generateCanvasGrid } from "./utils/generateCanvasGrid";
import {
  ACTION,
  CANVAS_SIZE,
  COLOR,
  MIRROR,
  MOUSE,
} from "./Constants/Constants";
import { floodFill } from "./utils/floodFill";
import Sidebar from "./components/SideBar/Sidebar";
import { ColorContext } from "./contextStore/ColorsContext";
import ButtonPanel from "./components/ButtonPanel/ButtonPanel";

export type Action = (typeof ACTION)[keyof typeof ACTION];
type Mouse = (typeof MOUSE)[keyof typeof MOUSE];
type Mirror = (typeof MIRROR)[keyof typeof MIRROR];
export type MirrorType = Mirror | null;
type MouseCLick = Mouse | null;

function App() {
  const [color1, setColor1] = useState("#000000");
  const [color2, setColor2] = useState("#000000");
  const [action, setAction] = useState<Action>(ACTION.DRAW);
  const [canvas, setCanvas] = useState(generateCanvasGrid());
  const [mouseClick, setMouseclick] = useState<MouseCLick>(null);
  const [isMirror, setMirror] = useState<MirrorType>(null);

  function updateCanvas(
    color: string,
    rowIndex: number,
    colIndex: number,
    isMirror: MirrorType
  ) {
    setCanvas((prevCanvas) => {
      const newCanvas = prevCanvas.map((row) => [...row]);
      newCanvas[rowIndex][colIndex] = color;
      if (isMirror === MIRROR.HORIZONTAL) {
        newCanvas[rowIndex][CANVAS_SIZE - colIndex] = color;
      }
      else if (isMirror === MIRROR.VERTICAL) {
        newCanvas[CANVAS_SIZE - rowIndex][colIndex] = color;
      }
      else if (isMirror === MIRROR.BOTH) {
        newCanvas[CANVAS_SIZE - rowIndex][CANVAS_SIZE - colIndex] = color;
      }
      return newCanvas;
    });
  }
  function handlePaint(
    e: React.MouseEvent<HTMLDivElement>,
    rowIndex: number,
    colIndex: number
  ) {
    if (!mouseClick) {
      return;
    }
    if (e.target instanceof HTMLDivElement) {
      if (action === ACTION.DRAW || action === ACTION.FILL) {
        const color = mouseClick === MOUSE.LEFT_CLICK ? color1 : color2;
        updateCanvas(color, rowIndex, colIndex, isMirror);
      } else {
        updateCanvas("#ffffff", rowIndex, colIndex, isMirror);
      }
    }
  }
  function handleMouseDown(
    e: React.MouseEvent<HTMLDivElement>,
    rowIndex: number,
    colIndex: number
  ) {
    if (e.button === MOUSE.RIGHT_CLICK) {
      setMouseclick(() => MOUSE.RIGHT_CLICK);
    } else {
      setMouseclick(() => MOUSE.LEFT_CLICK);
    }
    handleFill(e, rowIndex, colIndex);
  }
  function handleMouseUp() {
    setMouseclick(() => null);
  }
  const memoizedPickColor = useCallback(function pickColor(
    e: ChangeEvent<HTMLInputElement>,
    color: number
  ) {
    if (color === COLOR.PRIMARY) {
      setColor1(() => e.target.value);
    } else {
      setColor2(() => e.target.value);
    }
  },
  []);
  function handleEraseAll() {
    setCanvas(() => generateCanvasGrid());
  }
  function handleFill(
    e: React.MouseEvent<HTMLDivElement>,
    rowIndex: number,
    colIndex: number
  ) {
    if (action !== ACTION.FILL) {
      return;
    }
    if (e.button === MOUSE.RIGHT_CLICK) {
      setCanvas((prevCanvas) =>
        floodFill(prevCanvas, rowIndex, colIndex, color2)
      );
    } else {
      setCanvas((prevCanvas) =>
        floodFill(prevCanvas, rowIndex, colIndex, color1)
      );
    }
  }
  function handleAction(action: Action) {
    switch (action) {
      case ACTION.DRAW: {
        setAction(() => ACTION.DRAW);
        break;
      }
      case ACTION.ERASE: {
        setAction(() => ACTION.ERASE);
        break;
      }
      case ACTION.FILL: {
        setAction(() => ACTION.FILL);
        break;
      }
    }
  }
  function handleMirror(action: MirrorType) {
    setMirror(action);
  }
  return (
    <div className="main-container">
      <ColorContext
        value={{ color1: color1, color2: color2, pickColor: memoizedPickColor }}
      >
        <Sidebar>
          <ButtonPanel
            action={action}
            handleEraseAll={handleEraseAll}
            handleAction={handleAction}
            mirror={{
              isMirror: isMirror,
              handleMirror: handleMirror,
            }}
          />
        </Sidebar>
      </ColorContext>
      <Canvas
        canvas={canvas}
        handlePaint={handlePaint}
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
      />
    </div>
  );
}

export default App;
