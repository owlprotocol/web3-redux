import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
//import { ReactComponent as RoundedPlusIcon } from '../../assets/icon-rounded-plus.svg';
//import { ReactComponent as RoundedXIcon } from '../../assets/rounded-x.svg';

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
                <Box w={10}>{/*<RoundedPlusIcon /> */}</Box>
                <Box>Upload file</Box>
                <input {...getInputProps()} />
            </div>

            {files[0]?.preview && (
                <Box>
                    <img src={files[0]?.preview} />
                    <button onClick={handleReset}>
                        <Box w={10}>{/*<RoundedXIcon />*/}</Box>
                    </button>
                </Box>
            )}
        </Box>
    );
};

export default FileDropzone;
