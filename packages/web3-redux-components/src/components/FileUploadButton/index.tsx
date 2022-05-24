import { Button, Input } from '@chakra-ui/react';
import { useCallback, useRef, useState, useMemo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

//https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
//Use the hacky way to hid the default file input
export interface Props {
    accept: 'application/json' | 'image/*' | string | undefined;
    onFileDataChange: (data: string | null) => void;
}
export const FileUploadButton = ({
    accept = 'application/json',
    onFileDataChange = (data) => console.log(data),
}: Props) => {
    const fileInputRef = useRef<any>();

    const fileReader = useMemo(() => new FileReader(), []);
    const [file, setFile] = useState<File | undefined>();
    const [fileData, setFileData] = useState<any>(null);
    //Add event listener
    useEffect(() => {
        fileReader.addEventListener('load', (event) => {
            const data = event.target?.result as string | null;
            if (data && accept === 'application/json') setFileData(JSON.parse(data));
            else setFileData(data);
        });
    }, [accept, fileReader]);

    useEffect(() => {
        onFileDataChange(fileData);
    }, [fileData, onFileDataChange]);

    const onFileChange = useCallback(
        (event) => {
            const file = event.target.files[0] as File;
            setFile(file);
            fileReader.readAsText(file, 'utf-8');
        },
        [fileReader],
    );

    const onButtonClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const fileExists = !!file;
    const buttonTitle = fileExists ? file.name : 'Upload';
    const leftIcon = fileExists ? <></> : <FontAwesomeIcon icon={faUpload} />;

    return (
        <>
            <Input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={onFileChange} accept={accept} />
            <Button onClick={onButtonClick} leftIcon={leftIcon}>
                {buttonTitle}
            </Button>
        </>
    );
};

export default FileUploadButton;
