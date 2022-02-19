import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase-config";
import { auth } from './firebase-config'
import { onAuthStateChanged, updateProfile } from 'firebase/auth';



export async function uploadtofirebase(file, setDurl, setFrImgUpdate) {
    const memberid = localStorage.getItem("memberid");
    const storageRef = ref(storage, `${memberid}files/${memberid}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on('state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //console.log('Upload is ' + progress + '% done');
            // switch (snapshot.state) {
            //   case 'paused':
            //     console.log('Upload is paused');
            //     break;
            //   case 'running':
            //     console.log('Upload is running');
            //     break;
            // }
        },
        (error) => {
            console.log(error.message);
            // Handle unsuccessful uploads
        },
        () => {

            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                updateProfile(auth.currentUser, { photoURL: downloadURL }).then(() =>
                    console.log("圖片以上傳到firebase", downloadURL)
                )
                setFrImgUpdate(false);
                setDurl(downloadURL)
                //return downloadURL;

            });
        }
    );
}

// export function updatefireprofile(changename, changephotourl) {

//     updateProfile(auth.currentUser, {
//         displayName: changename,
//         photoURL: changephotourl
//     }).then(() => {

//         console.log("profile3修改成功");
//         // Profile updated!
//         // ...
//     }).catch((error) => {
//         console.log(error.message);
//         // An error occurred
//         // ...
//     });
// }