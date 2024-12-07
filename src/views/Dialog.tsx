import styles from './Dialog.module.css';


interface IProps {
    children: React.ReactNode;
    visible: boolean;
    onClose: () => void;
}

export const Dialog = ({ children, visible, onClose }: IProps) => {
    return (
        <div className={styles.container}>
            <div className={`${styles.bg} ${visible ? 'animate__fadeIn' : 'animate__fadeOut'}`} />
            <div onAnimationEnd={() => {
                if (!visible) {
                    onClose();
                }
            }} className={`${styles.content} ${visible ? 'animate__bounceIn' : 'animate__fadeOut'}`}>
                {children}
            </div>
        </div>
    )
}
