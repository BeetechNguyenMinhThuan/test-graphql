import {useEffect, useState} from "react";
import {getUrl} from 'aws-amplify/storage';

// async function getFileDetail(key) {
//     try {
//         const result = await getProperties({
//             key: key,
//             options: {
//                 accessLevel: 'guest', // defaults to `guest` but can be 'private' | 'protected' | 'guest'
//                 targetIdentityId: 'xxxxxxx' // ID of another user, if `accessLevel: protected`
//             }
//         });
//         return result
//     } catch (error) {
//         console.log('Error ', error);
//     }
// }


async function getFileUrl(key) {
    try {
        return await getUrl({key: key});
    } catch (error) {
        console.log('Error ', error);
    }
}

const ImageBook = ({imgKey}) => {
    const [imgUrl, setImgUrl] = useState('213');
    useEffect(() => {
        async function fetchData() {
            let imgUrl = await getFileUrl(imgKey);
            console.log(imgUrl)
            setImgUrl(imgUrl.url.href);
        }

        fetchData();

        // getFileUrl(imgKey).then(url => setImgUrl(url));
    }, [imgKey]);
    return imgUrl ? <img style={{display:"block",marginBottom:"10px"}} src={imgUrl} alt="Description"/> : <p>Loading...</p>;
}
export default ImageBook