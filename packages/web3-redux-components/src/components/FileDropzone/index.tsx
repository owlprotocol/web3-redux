import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

// const Wrapper = styled.div`
//     width: 160px;
//     height: 160px;
//     background: #2c2c30;
//     border-radius: 12px;
//     position: relative;
//     transition: 250ms;

//     .file-dropzone {
//         width: 100%;
//         height: 100%;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         cursor: pointer;
//     }

//     &:hover {
//         opacity: 0.7;
//     }

//     input {
//         height: 100%;
//         width: 100%;
//     }
// `;

// const Title = styled.div`
//     color: #575757;
//     font-weight: 600;
//     font-size: 18px;
//     line-height: 20px;
//     text-align: center;
//     position: absolute;
//     z-index: 1;
//     bottom: 20px;
//     left: 0;
//     width: 100%;
// `;

// const FilePreview = styled.div`
//     width: 94%;
//     height: 94%;
//     position: absolute;
//     left: 5px;
//     top: 5px;
//     z-index: 12;
//     background-color: #ccc;
//     border-radius: 8px;
//     overflow: hidden;

//     img {
//         object-fit: cover;
//         height: 100%;
//         width: 100%;
//         border-radius: 20px;
//         overflow: hidden;
//     }

//     button {
//         width: 26px;
//         height: 26px;
//         position: absolute;
//         top: 0;
//         right: 0;
//         z-index: 222;
//         display: flex;
//         align-items: center;
//         justify-content: center;

//         svg path {
//             fill: red;
//         }
//     }
// `;

export interface Props {
    previewURL?: string;
}

const FileDropzone = ({ previewURL }: Props) => {
    const [files, setFiles] = useState([{ preview: '' }]);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles: any) => {
            setFiles(
                // @ts-ignore
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    }),
                ),
            );
        },
    });

    useEffect(() => {
        // @ts-ignore
        files.forEach((file) => URL.revokeObjectURL(file?.preview));
    }, [files]);

    useEffect(() => {
        // Set preview URL for pre-filled item
        // @ts-ignore
        setFiles([{ preview: previewURL }]);
    }, [previewURL]);

    const handleReset = () => {
        setFiles([]);
    };

    return (
        <Box w={'100%'} h={'196px'}>
            <div {...getRootProps({ className: 'file-dropzone' })}>
                <Box w={10}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M20 1.66663C9.87496 1.66663 1.66663 9.87496 1.66663 20C1.66663 30.125 9.87496 38.3333 20 38.3333C30.125 38.3333 38.3333 30.125 38.3333 20C38.3333 9.87496 30.125 1.66663 20 1.66663ZM21.6666 26.6666C21.6666 27.1087 21.491 27.5326 21.1785 27.8451C20.8659 28.1577 20.442 28.3333 20 28.3333C19.5579 28.3333 19.134 28.1577 18.8214 27.8451C18.5089 27.5326 18.3333 27.1087 18.3333 26.6666V21.6666H13.3333C12.8913 21.6666 12.4673 21.491 12.1548 21.1785C11.8422 20.8659 11.6666 20.442 11.6666 20C11.6666 19.5579 11.8422 19.134 12.1548 18.8214C12.4673 18.5089 12.8913 18.3333 13.3333 18.3333H18.3333V13.3333C18.3333 12.8913 18.5089 12.4673 18.8214 12.1548C19.134 11.8422 19.5579 11.6666 20 11.6666C20.442 11.6666 20.8659 11.8422 21.1785 12.1548C21.491 12.4673 21.6666 12.8913 21.6666 13.3333V18.3333H26.6666C27.1087 18.3333 27.5326 18.5089 27.8451 18.8214C28.1577 19.134 28.3333 19.5579 28.3333 20C28.3333 20.442 28.1577 20.8659 27.8451 21.1785C27.5326 21.491 27.1087 21.6666 26.6666 21.6666H21.6666V26.6666Z"
                            fill="currentColor"
                            fillOpacity="0.3"
                        />
                    </svg>
                </Box>
                <Box>Upload file</Box>
                <input {...getInputProps()} />
            </div>

            {files[0]?.preview && (
                <Box>
                    <img src={files[0]?.preview} />
                    <button onClick={handleReset}>
                        <Box w={10}>
                            <svg
                                width="34"
                                height="34"
                                viewBox="0 0 34 34"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_705_1131)">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M8.77817 9.25128C4.4825 13.5469 4.4825 20.512 8.77817 24.8076C13.0738 29.1033 20.0388 29.1033 24.3345 24.8076C28.6302 20.5119 28.6302 13.5469 24.3345 9.25128C20.0388 4.9556 13.0738 4.9556 8.77817 9.25128ZM20.0919 19.1508C20.2794 19.3383 20.3848 19.5927 20.3848 19.8579C20.3848 20.1231 20.2794 20.3774 20.0919 20.565C19.9043 20.7525 19.65 20.8579 19.3848 20.8579C19.1196 20.8579 18.8652 20.7525 18.6777 20.565L16.5563 18.4437L14.435 20.565C14.2475 20.7525 13.9931 20.8579 13.7279 20.8579C13.4627 20.8579 13.2084 20.7525 13.0208 20.565C12.8333 20.3774 12.7279 20.1231 12.7279 19.8579C12.7279 19.5927 12.8333 19.3383 13.0208 19.1508L15.1421 17.0294L13.0208 14.9081C12.8333 14.7206 12.7279 14.4662 12.7279 14.201C12.7279 13.9358 12.8333 13.6815 13.0208 13.4939C13.2084 13.3064 13.4627 13.201 13.7279 13.201C13.9931 13.201 14.2475 13.3064 14.435 13.4939L16.5563 15.6152L18.6777 13.4939C18.8652 13.3064 19.1196 13.201 19.3848 13.201C19.65 13.201 19.9043 13.3064 20.0919 13.4939C20.2794 13.6815 20.3848 13.9358 20.3848 14.201C20.3848 14.4662 20.2794 14.7206 20.0919 14.9081L17.9706 17.0294L20.0919 19.1508Z"
                                        fill="#D3D9F3"
                                        fillOpacity="0.3"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_705_1131">
                                        <rect
                                            width="24"
                                            height="24"
                                            fill="white"
                                            transform="translate(0 17) rotate(-45)"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                        </Box>
                    </button>
                </Box>
            )}
        </Box>
    );
};

export default FileDropzone;
