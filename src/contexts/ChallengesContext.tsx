import { createContext, useState, ReactNode, useEffect} from 'react'
import Cookies from 'js-cookie';
import challenges from  '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

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
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
    children,
    ...rest
 }:ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengeCompleted, setChallengeCompleted] = useState(rest.challengesCompleted ?? 0);
    
    const [activeChallenge, setActveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
 
    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => { 
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengeCompleted', String(challengeCompleted));
        
    }, [level, currentExperience, challengeCompleted])

    function levelUp()  {
      setLevel(level+1);
      setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }


    function startNewChallenge() {
        const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[ramdomChallengeIndex];
        
        setActveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('New challenge ! 🥳',{ 
               body: `Worth: ${challenge.amount}xp!`})
        }
    }

    function resetChallenge() {
        setActveChallenge(null); //
    }

   function completeChallenge() {
        if(!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActveChallenge(null);
        setChallengeCompleted(challengeCompleted + 1);
    }
    return(

        <ChallengesContext.Provider value={{
            level,
            currentExperience, 
            challengeCompleted, 
            activeChallenge, 
            experienceToNextLevel,
            levelUp,startNewChallenge,
            resetChallenge,
            completeChallenge,
            closeLevelUpModal,
        }
             }
            >
                {children}
                { isLevelUpModalOpen && <LevelUpModal/>}
      </ChallengesContext.Provider>
    );
}