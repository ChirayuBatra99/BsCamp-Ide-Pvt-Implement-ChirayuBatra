import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import styles from './sellpage.module.scss';

function SellPage() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);
    const MAX_COUNT = 5;

    const handleUploadFiles = (files) => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;

        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    alert(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
            return false;
        });

        if (!limitExceeded) setUploadedFiles(uploaded);
    };

    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files);
        handleUploadFiles(chosenFiles);
    };

    return (
        <div>
            <Navbar />
            <form className={styles.textInputs}>
                <label>
                    Item name
                    <input type="text" />
                </label>
                <label>
                    Set Price
                    <input type="text" />
                </label>
                <label>
                    How much used (in months)
                    <input type="text" />
                </label>
            </form>
            <input
                id="fileUpload"
                type="file"
                multiple
                accept="application/pdf, image/png"
                onChange={handleFileEvent}
            />
        </div>
    );
}

export default SellPage;
