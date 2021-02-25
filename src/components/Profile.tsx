import styles from '../styles/components/Profile.module.css';

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/44853890?s=460&u=2f82d65c8e7780a0206be48912871de9a28a17e3&v=4" alt="André Luiz" />
        <div>
            <strong>André Luiz</strong>
            <p>
                <img src="icons/level.svg" alt="Level"/>
                Level 1

            </p>
        </div>
        </div>
        
    )
}