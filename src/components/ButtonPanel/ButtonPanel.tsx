import { Action, MirrorType } from "../../App";
import { ACTION, MIRROR } from "../../Constants/Constants";
import styles from "./ButtonPanel.module.css";
import erase from "../../assets/eraser.svg";
import eraseAll from "../../assets/eraseAll.svg";
import pencil from "../../assets/pencil.svg";
import fill from "../../assets/fill.svg";
import mirrorImg from "../../assets/mirror.svg";
import hMirror from "../../assets/horizontalMirror.svg";
import vMirror from "../../assets/verticalMirror.svg";
import undo from '../../assets/undo.svg';
import redo from '../../assets/redo.svg';

interface ButtonPanelProp {
  action: Action;
  handleEraseAll: () => void;
  handleAction: (action: Action) => void;
  handleUndoRedo: (operation:Action)=>void;
  mirror: {
    isMirror: MirrorType;
    handleMirror: (action:MirrorType) => void;
  };
}
const ButtonPanel = ({
  action,
  handleEraseAll,
  handleAction,
  mirror,
  handleUndoRedo,
}: ButtonPanelProp) => {
  return (
    <div className={styles.panel}>
      <div>
        <button
          className={action === "erase" ? styles.active : styles.inactive}
          title="Eraser"
          onClick={() => handleAction(ACTION.ERASE)}
        >
          <img src={erase} alt="eraser" />
        </button>
        <button
          className={action === "draw" ? styles.active : styles.inactive}
          title="Pencil"
          onClick={() => handleAction(ACTION.DRAW)}
        >
          <img src={pencil} alt="pencil" />
        </button>
        <button
          className={action === "fill" ? styles.active : styles.inactive}
          title="Fill"
          onClick={() => handleAction(ACTION.FILL)}
        >
          <img src={fill} alt="fill" />
        </button>
      </div>
      <button
        className={styles.eraseAllBtn}
        title="Erase All"
        onClick={handleEraseAll}
      >
        <img src={eraseAll} alt="eraser all" />
      </button>
      <div>
        <button
          className={`${mirror.isMirror ? styles.active : styles.inactive} ${
            styles.eraseAllBtn
          }`}
          title="Mirror"
          onClick={()=>mirror.handleMirror(mirror.isMirror ? null : MIRROR.BOTH)}
        >
          <img src={mirrorImg} alt="mirror" />
        </button>
        {mirror.isMirror && (
          <>
            <button
              className={mirror.isMirror === MIRROR.HORIZONTAL ? styles.active : styles.inactive}
              title="Mirror Horizontally"
              onClick={()=>mirror.handleMirror(MIRROR.HORIZONTAL)}
            >
              <img src={hMirror} alt="mirror" />
            </button>
            <button
              className={mirror.isMirror === MIRROR.VERTICAL ? styles.active : styles.inactive}
              title="Mirror Vertically"
              onClick={()=>mirror.handleMirror(MIRROR.VERTICAL)}
            >
              <img src={vMirror} alt="mirror" />
            </button>
          </>
        )}
      </div>
      <div className={styles.eraseAllBtn}>
        <button
          className={styles.active}
          title="Undo"
          onClick={()=>handleUndoRedo("undo")}
        >
          <img src={undo} alt="undo" />
        </button>
        <button
          className={styles.inactive}
          title="Redo"
          onClick={()=>handleUndoRedo("redo")}
        >
          <img src={redo} alt="redo" />
        </button>
      </div>
    </div>
  );
};

export default ButtonPanel;
