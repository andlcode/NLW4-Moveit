import  {createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';

let countdownTimeout: NodeJS.Timeout

interface CountdownContextData {
    minutes:number;
    seconds: number;
    hasFinished:boolean;
    isActive:boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownContextProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownContextProps) {
    
        const {startNewChallenge} = useContext(ChallengesContext);
        const [time, setTime] = useState(0.1 * 60);
      
      //  console.log(contextData);
        const [hasFinished, setHasFinished] = useState(false);
    
        const [isActive, setIsActive] = useState(false);
    
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        function startCountdown() {
            setIsActive(true);
        }
    
        function resetCountdown() {
            clearTimeout(countdownTimeout);
            setHasFinished(false);
            setIsActive(false);
            setTime(0.1*60);
        }
    
        useEffect(() => {
            // console.log(active);
            if (isActive && time > 0) {
            countdownTimeout =    setTimeout(() => {
                    setTime(time - 1);
                }, 1000);
            } else if( isActive && time === 0) {
                setHasFinished(true);
                setIsActive(false);
                startNewChallenge(); 
            }
        }, [isActive, time]);
    
    
        return (
    <CountdownContext.Provider value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown,
    }}> 
                {children}
        </CountdownContext.Provider>   
    )
}  