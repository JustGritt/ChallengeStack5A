import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

interface ModalProps {
    type: 'email-validate'
    title: string,
    content: string
    onClose?: () => void
}

const Modal: FC<ModalProps> = ({
    type,
    title,
    content,
    onClose
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, transform: 'translateY(20%)' }}
            animate={{ opacity: 1, transform: 'translateY(0%)' }}
            exit={{ opacity: 0, transform: 'translateY(20%)' }}
            transition={{ duration: .2 }}
            className="flex flex-col justify-center items-start gap-3 w-full h-full absolute z-50 backdrop-blur-sm">
            <div className="m-auto w-[400px] bg-white p-5 rounded-md  shadow-xl">
                <div className="flex justify-between items-start w-full">
                    <div className="bg-[#EEF2FF] rounded-full p-3 mb-4">
                        <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32 0H29.224V2.0167H26.476V0H5.52398V2.0167H2.77566V0H0V32H2.77566V29.9833H5.52398V32H26.476V29.9833H29.224V32H32V0ZM5.52398 27.4696H2.77566V23.62H5.52398V27.4696ZM5.52398 21.1063H2.77566V17.2566H5.52398V21.1063ZM5.52398 14.743H2.77566V10.8933H5.52398V14.743ZM5.52398 8.38041H2.77566V4.52999H5.52398V8.38041ZM23.8651 29.9028H8.13487V17.052H23.8655L23.8651 29.9028ZM23.8651 14.9476H8.13487V2.09757H23.8655L23.8651 14.9476ZM29.224 27.4696H26.476V23.62H29.224V27.4696ZM29.224 21.1063H26.476V17.2566H29.224V21.1063ZM29.224 14.743H26.476V10.8933H29.224V14.743ZM29.224 8.38041H26.476V4.52999H29.224V8.38041Z" fill="#111111" />
                        </svg>
                    </div>
                    <FontAwesomeIcon onClick={onClose} className="text-gray-500 cursor-pointer" icon={faXmark} />
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className="text-black font-semi-bold text-xl">{title}</h1>
                    <p className="text-gray-500 text-sm" dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </div>
        </motion.div>
    );
}

export default Modal;