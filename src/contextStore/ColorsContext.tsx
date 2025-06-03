import { ChangeEvent, createContext } from "react";

type ColorContextType = {
    color1:string,
    color2:string,
    pickColor: (e:ChangeEvent<HTMLInputElement>, color: number) => void,
}
export const ColorContext = createContext<ColorContextType>({
    color1: '#ffffff',
    color2: '#ffffff',
    pickColor: ()=>{},
});
