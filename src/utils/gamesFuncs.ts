import { Dispatch, SetStateAction } from "react";
import Gun from "../components/Game/Gun/Gun";

export const handleParticle = (arr1: any[], arr2: any[]) => {
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            const dx = arr1[i].x - arr2[j].x;
            const dy = arr1[i].y - arr2[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 50) {
                arr1[i].remove = true;
                arr2[j].remove = true;
                return 1;
            }
        }
    }
};
export const handleCollision = (
    arr1: any[],
    mouseCoords: { x: number; y: number },
    setGameOver: Dispatch<SetStateAction<boolean>>
) => {
    for (let i = 0; i < arr1.length; i++) {
        const dx = arr1[i].x - mouseCoords.x;
        const dy = arr1[i].y - mouseCoords.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 50) {
            return setGameOver(true);
        }
    }
};

export function addToGunsArray(
    mouseCoords: { x: number; y: number },
    color: string
) {
    return new Gun(mouseCoords, color);
}