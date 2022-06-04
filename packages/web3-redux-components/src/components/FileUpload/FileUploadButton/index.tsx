import { Button, Input, StyleProps } from '@chakra-ui/react';
import { useCallback, useRef, useState, useMemo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

export type FileData = string | ArrayBuffer | Record<string, any> | null | undefined;

//https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
//Use the hacky way to hid the default file input
export interface Props {
    accept?: 'application/json' | 'image/*' | string | undefined;
    onFileChange?: (file: File | undefined) => void;
    onFileDataChange?: (data: FileData) => void;
    buttonStyle?: StyleProps;
}
/**
 * A simple button component that enables file upload with state change handlers.
 */
export const FileUploadButton = ({
    accept = 'application/json',
    onFileChange = (file) => console.log(file),
    onFileDataChange = (data) => console.log(data),
    buttonStyle,
}: Props) => {
    const fileInputRef = useRef<any>();

    const fileReader = useMemo(() => new FileReader(), []);
    const [file, setFile] = useState<File | undefined>();
    const [fileData, setFileData] = useState<FileData>();

    //Add event listener
    useEffect(() => {
        fileReader.addEventListener('load', (event) => {
            const data = event.target?.result;
            if (data && accept === 'application/json') setFileData(JSON.parse(data as string));
            else setFileData(data);
        });
    }, [accept, fileReader]);

    useEffect(() => {
        onFileDataChange(fileData);
    }, [fileData, onFileDataChange]);

    useEffect(() => {
        onFileChange(file);
    }, [file, onFileChange]);

    const onFileChangeEvent = useCallback(
        (event) => {
            const file = event.target.files[0] as File;
            setFile(file);
            if (accept === 'application/json') fileReader.readAsText(file, 'utf-8');
            else fileReader.readAsArrayBuffer(file);
        },
        [accept, fileReader],
    );

    const onButtonClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const fileExists = !!file;
    const buttonTitle = fileExists ? file.name : 'Select File';
    const leftIcon = fileExists ? <></> : <FontAwesomeIcon icon={faUpload} />;

    return (
        <>
            <Input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={onFileChangeEvent}
                accept={accept}
            />
            <Button onClick={onButtonClick} leftIcon={leftIcon} {...buttonStyle}>
                {buttonTitle}
            </Button>
        </>
    );
};

export default FileUploadButton;
