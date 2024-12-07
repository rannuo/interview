import styles from './Loading.module.css';

interface IProps {
    singleton: boolean;
}
/**
 * @copyright https://loading.io/css/
 */
export const Loading = ({ singleton }: IProps) => {
    const core = <div className={styles.spinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;

    if (singleton) {
        return core;
    }
    return (
        <div className={styles.container}>
            {core}
        </div>
    )
}
