import { createContext, useState, ReactNode} from 'react'
import challenges from  '../../challenges.json';

interface Challenge {
    type: 'body'  | 'eye';
    description: string;
    amount: number;
} 
interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengeCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children }:ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(30);
    const [challengeCompleted, setChallengeCompleted] = useState(0);
    const [activeChallenge, setActveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp()  {
      setLevel(level+1);
    }

    function startNewChallenge() {
        const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[ramdomChallengeIndex];
        
        setActveChallenge(challenge);

    }

    function resetChallenge() {
        setActveChallenge(null); //
    }
    return(

        <ChallengesContext.Provider value={{level,currentExperience, challengeCompleted, activeChallenge, experienceToNextLevel, levelUp,startNewChallenge, resetChallenge}}>
                {children}
      </ChallengesContext.Provider>
    )
}