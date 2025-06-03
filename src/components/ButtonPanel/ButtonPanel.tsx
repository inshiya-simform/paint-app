import { Action, MirrorType } from "../../App";
import { ACTION, MIRROR } from "../../Constants/Constants";
import styles from "./ButtonPanel.module.css";
import Erase from "../../assets/eraser.svg";
import EraseAll from "../../assets/eraseAll.svg";
import Pencil from "../../assets/pencil.svg";
import Fill from "../../assets/fill.svg";
import Mirror from "../../assets/mirror.svg";
import HMirror from "../../assets/horizontalMirror.svg";
import VMirror from "../../assets/verticalMirror.svg";

interface ButtonPanelProp {
  action: Action;
  handleEraseAll: () => void;
  handleAction: (action: Action) => void;
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
}: ButtonPanelProp) => {
  return (
    <div className={styles.panel}>
      <div>
        <button
          className={action === "erase" ? styles.active : styles.inactive}
          title="Eraser"
          onClick={() => handleAction(ACTION.ERASE)}
        >
          <img src={Erase} alt="eraser" />
        </button>
        <button
          className={action === "draw" ? styles.active : styles.inactive}
          title="Pencil"
          onClick={() => handleAction(ACTION.DRAW)}
        >
          <img src={Pencil} alt="pencil" />
        </button>
        <button
          className={action === "fill" ? styles.active : styles.inactive}
          title="Fill"
          onClick={() => handleAction(ACTION.FILL)}
        >
          <img src={Fill} alt="fill" />
        </button>
      </div>
      <button
        className={styles.eraseAllBtn}
        title="Erase All"
        onClick={handleEraseAll}
      >
        <img src={EraseAll} alt="eraser all" />
      </button>
      <div>
        <button
          className={`${mirror.isMirror ? styles.active : styles.inactive} ${
            styles.eraseAllBtn
          }`}
          title="Mirror"
          onClick={()=>mirror.handleMirror(mirror.isMirror ? null : MIRROR.BOTH)}
        >
          <img src={Mirror} alt="mirror" />
        </button>
        {mirror.isMirror && (
          <>
            <button
              className={mirror.isMirror === MIRROR.HORIZONTAL ? styles.active : styles.inactive}
              title="Mirror Horizontally"
              onClick={()=>mirror.handleMirror(MIRROR.HORIZONTAL)}
            >
              <img src={HMirror} alt="mirror" />
            </button>
            <button
              className={mirror.isMirror === MIRROR.VERTICAL ? styles.active : styles.inactive}
              title="Mirror Vertically"
              onClick={()=>mirror.handleMirror(MIRROR.VERTICAL)}
            >
              <img src={VMirror} alt="mirror" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ButtonPanel;
