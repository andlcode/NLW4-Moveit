import { useContext, useEffect, useState } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Countdown.module.css";

let countdownTimeout: NodeJS.Timeout

export function Countdown() {
    /**
     * O countdown precisa começar de um tempo e ir diminuindo em segundos.
     * (25 minutos * 60 segundos.)
     */
    const [time, setTime] = useState(0.1 * 60);
    const  contextData = useContext(ChallengesContext);
    console.log(contextData);
    const [hasFinished, setHasFinished] = useState(false);
    // Estado para mostrar se a contagem finalizou

    // Estado da contage, se está ativa ou não, no começo está inativo.
    const [isActive, setIsActive] = useState(false);

    // Retornando o número de minutos totais.
    const minutes = Math.floor(time / 60);
    // Retornando o resto da divisão.
    const seconds = time % 60;

    // Retornando apenas o "primeiro" e o "segundo" número do minuto.
    const [minuteLeft, minuteRight] = String(minutes)
        .padStart(2, "0")
        .split("");
    // Retornando apenas o "primeiro" e o "segundo" número do segundo.
    const [secondLeft, secondRight] = String(seconds)
        .padStart(2, "0")
        .split("");

    // Função para iniciar a contagem.
    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
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
        }
    }, [isActive, time]);

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

        { hasFinished  ? (
            
            <button
            disabled
                type="button"
                className={styles.countdownButton} 
               
            >
                Ciclo encerrado.
            </button>) : (
                <>
                
            { isActive ? (
            <button
                type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}
            >
                Abandonar ciclo
            </button>) : (<button
                type="button"
                className={styles.countdownButton}
                onClick={startCountdown}
            >
                Iniciar um ciclo
            </button>)}
 
                </>
            ) }
       </div>
    );
}