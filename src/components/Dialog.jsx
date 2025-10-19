import { useEffect, useRef } from "react";
import styles from "../styles/components/modal.module.css";

export default function Modal({ isShowing, onClose, children }) {
    const ref = useRef(null);

    useEffect(() => {
        if (isShowing) {
            ref.current?.showModal();
            document.body.style.overflow = "hidden";
        } else {
            ref.current?.close();
            document.body.style.overflow = "auto";
        }
    }, [isShowing]);

    const handleOutsideClick = (e) => {
        const dialog = ref.current;
        const rect = dialog.querySelector(`.${styles.modalContent}`).getBoundingClientRect();
        const clickedInside =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;
        if (!clickedInside) onClose();
    };


    return (
        <dialog ref={ref} className={styles.modalOverlay} onCancel={onClose} onClick={handleOutsideClick}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>
                    ×
                </span>
                {children}
            </div>
        </dialog>
    );
}
