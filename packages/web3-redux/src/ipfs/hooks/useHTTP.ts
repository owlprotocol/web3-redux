import { useState, useEffect } from "react";
import axios from 'axios';

/**
 * TODO
 * Use local redux cache?
 */

/**
 * Get content for HTTP URI
 * @category Hooks
 * */
export const useHTTP = (uri: string | undefined, fetch = 'ifnull' as 'ifnull' | true | false) => {
    const [content, setContent] = useState(undefined as any);
    useEffect(() => {
        //Get http api content
        if (uri) {
            axios.get(uri).then((response) => {
                setContent(response.data);
            })
        } else {
            setContent(undefined);
        }
    }, [uri]);

    return [content]
}

export default useHTTP;
