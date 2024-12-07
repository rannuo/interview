import styles from './Loading.module.css';

/**
 * @copyright https://loading.io/css/
 */
export const Loading = () => {
    return (
        <div className={styles.container}>
            <div className={styles.spinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}
