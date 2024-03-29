import { useState, useEffect } from "react";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    StorageError,
} from "firebase/storage";
import { storage } from "../../firebase/firebase-config";
import Resizer from "react-image-file-resizer";
import { v4 } from "uuid";

// function that resizes a file
// https://github.com/onurzorluer/react-image-file-resizer#readme
const resizeFile = (file: File) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            1240,
            1240,
            "JPEG",
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "file"
        );
    });
function useFileUpload<T>(
    file: File | null,
    parentFolder = "ship-images"
    // childFolder: string
) {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<StorageError | null>(null);
    const [url, setUrl] = useState<{ url: string; alt: string } | null>(null);

    useEffect(() => {
        (async () => {
            if (!file) return;

            const image: any = await resizeFile(file);
            const imageName = image.name + v4();
            const storageRef = ref(storage, `${parentFolder}/${imageName}`);

            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const prc = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(prc);
                },
                (error) => {
                    return setError(error);
                },
                () => {
                    getDownloadURL(storageRef)
                        .then((url) => {
                            setUrl({
                                url: url,
                                alt: imageName,
                            });
                        })
                        .catch((e) => {
                            setError(e);
                            console.log(e.message);
                        });
                }
            );
        })();
    }, [file, parentFolder]);

    return { progress, error, url, setUrl };
}

export default useFileUpload;
