import React, {useCallback, useState} from "react";
import styles from './Dialog.module.css';


interface IProps {
    children: (close: (() => void)) => React.ReactNode;
    onClose: () => void;
}

export const Dialog = ({children, onClose}: IProps) => {
    const [visible, setVisible] = useState(true);
    const close = useCallback(() => {
        setVisible(false);
    }, []);

    return (
        <div className={styles.container}>
            <div className={`${styles.bg} ${visible ? 'animate__fadeIn' : 'animate__fadeOut'}`}/>
            <div
                onAnimationEnd={() => {
                    if (!visible) {
                        onClose();
                    }
                }}
                className={`${styles.content} ${visible ? 'animate__bounceIn' : 'animate__fadeOut'}`}
            >
                {children(close)}
            </div>
        </div>
    )
}
