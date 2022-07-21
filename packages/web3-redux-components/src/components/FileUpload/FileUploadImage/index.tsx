import { Box, Image, StyleProps } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import FileUploadButton, { FileData } from '../FileUploadButton/index.js';

//https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
//Use the hacky way to hid the default file input
export interface Props {
    accept?: 'image/*' | string | undefined;
    buttonStyle?: StyleProps;
    onFileChange?: (file: File | undefined) => void;
    onFileDataChange?: (data: FileData) => void;
}
export const FileUploadImage = ({ accept = 'image/*', buttonStyle, onFileChange, onFileDataChange }: Props) => {
    const [previewUrl, setPreviewUrl] = useState<any>(null);

    const onFileChangeCompose = useCallback(
        (file: File | undefined) => {
            if (file) setPreviewUrl(URL.createObjectURL(file));

            //Parent handler
            if (onFileChange) onFileChange(file);
        },
        [onFileChange],
    );

    return (
        <>
            <FileUploadButton
                accept={accept}
                buttonStyle={buttonStyle}
                onFileChange={onFileChangeCompose}
                onFileDataChange={onFileDataChange}
            />
            <Box w={'100%'} h={'200px'} mt={'-40px'}>
                {previewUrl && <Image src={previewUrl} objectFit={'scale-down'} h={'100%'} w={'100%'} />}
            </Box>
        </>
    );
};

export default FileUploadImage;
