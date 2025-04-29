import "./App.css";
import ButtonPanel from "./components/ButtonPanel/ButtonPanel";
import Canvas from "./components/Canvas/Canvas";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import Header from "./components/Header/Header";
import { ChangeEvent, useCallback, useState } from "react";
import { generateCanvasGrid } from "./utils/generateCanvasGrid";
import { ACTION, COLOR, MOUSE } from "./Constants/Constants";
import { floodFill } from "./utils/floodFill";

export type Action = (typeof ACTION)[keyof typeof ACTION];
type Mouse = (typeof MOUSE)[keyof typeof MOUSE];
type MouseCLick = Mouse | null;

function App() {
  const [color1, setColor1] = useState("#000000");
  const [color2, setColor2] = useState("#000000");
  const [action, setAction] = useState<Action>(ACTION.DRAW);
  const [canvas, setCanvas] = useState(generateCanvasGrid());
  const [mouseClick, setMouseclick] = useState<MouseCLick>(null);

  function handlePaint(
    e: React.MouseEvent<HTMLButtonElement>,
    rowIndex: number,
    colIndex: number
  ) {
    if (!mouseClick) {
      return;
    }
    if (e.target instanceof HTMLButtonElement) {
      if (action === ACTION.DRAW || action === ACTION.FILL) {
        setCanvas((prevCanvas) => {
          const newCanvas = prevCanvas.map((row) => [...row]);
          newCanvas[rowIndex][colIndex] =
            mouseClick === MOUSE.LEFT_CLICK ? color1 : color2;
          return newCanvas;
        });
      } else {
        setCanvas((prevCanvas) => {
          const newCanvas = prevCanvas.map((row) => [...row]);
          newCanvas[rowIndex][colIndex] = "#ffffff";
          return newCanvas;
        });
      }
    }
  }
  function handleMouseDown(
    e: React.MouseEvent<HTMLButtonElement>,
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
  // function pickColor(e:ChangeEvent<HTMLInputElement>,color:number){
  //   console.log("called")
  //   if (color === COLOR.PRIMARY){
  //     setColor1(()=> e.target.value)
  //   }else{
  //     setColor2(()=> e.target.value)
  //   }
  // } //wrap this component in useCallback. dependency color1 color2
  const memoizedPickColor = useCallback(function pickColor(
    e: ChangeEvent<HTMLInputElement>,
    color: number
  ) {
    console.log("called");
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
    e: React.MouseEvent<HTMLButtonElement>,
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
  return (
    <>
      <Header />
      <Canvas
        canvas={canvas}
        handlePaint={handlePaint}
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
      />
      <ColorPicker
        color1={color1}
        color2={color2}
        pickColor={memoizedPickColor}
      />
      <ButtonPanel
        action={action}
        handleEraseAll={handleEraseAll}
        handleAction={handleAction}
      />
    </>
  );
}

export default App;
