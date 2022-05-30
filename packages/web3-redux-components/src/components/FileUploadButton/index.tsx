import { Box, Button, Input, Image } from '@chakra-ui/react';
import { useCallback, useRef, useState, useMemo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

//https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
//Use the hacky way to hid the default file input
export interface Props {
    accept?: 'application/json' | 'image/*' | string | undefined;
    onFileDataChange?: (data: string | null) => void;
    buttonStyle?: any;
}
export const FileUploadButton = ({
    accept = 'application/json',
    onFileDataChange = (data) => console.log(data),
    buttonStyle,
}: Props) => {
    const fileInputRef = useRef<any>();

    const fileReader = useMemo(() => new FileReader(), []);
    const [file, setFile] = useState<File | undefined>();
    const [fileData, setFileData] = useState<any>(null);
    const [previewUrl, setPreviewUrl] = useState<any>(null);

    const isImage = accept.includes('image');

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
            isImage && setPreviewUrl(URL.createObjectURL(file));
            fileReader.readAsText(file, 'utf-8');
        },
        [fileReader, isImage],
    );

    const onButtonClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const fileExists = !!file;
    const buttonTitle = fileExists ? file.name : 'Select File';
    const leftIcon = fileExists ? <></> : <FontAwesomeIcon icon={faUpload} />;

    return (
        <>
            <Input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={onFileChange} accept={accept} />
            <Button onClick={onButtonClick} leftIcon={leftIcon} {...buttonStyle}>
                {buttonTitle}
            </Button>
            {isImage && previewUrl && (
                <Box w={'100%'} h={'200px'} mt={'-40px'}>
                    <Image src={previewUrl} objectFit={'cover'} h={'100%'} w={'100%'} />
                </Box>
            )}
        </>
    );
};

export default FileUploadButton;
