import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authService, collection, dbService, getDocs, getDownloadURL, query, ref, storageService, updateProfile, uploadString, where } from "fBase";
import { orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Profile = ({userObj, refreshUser}) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [attachment, setAttachment] =  useState("");
    const onLogOutClick = () => {
        authService.signOut()
        navigate("/");
        refreshUser();
    };
    const getMyNweets = async ()=>{
        const q = await query(collection(dbService, "nweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc=>( {id:doc.id, ...doc.data()} ));
    }
    useEffect(()=>{
        getMyNweets();
    });
    const onSubmit = async (event)=>{
        event.preventDefault();
        let attachmentUrl="";
        if(attachment !== undefined && attachment !== "" && attachment !== null){
            const fileRef = ref(storageService, `${userObj.uid}/profilePhoto/${uuidv4()}`);
            const response = await uploadString(fileRef, attachment, "data_url");
            await getDownloadURL(response.ref).then( async (data) => {
                attachmentUrl = data;
            });
        }
        await updateProfile(userObj, {displayName:newDisplayName??userObj.displayName , photoURL:attachmentUrl??userObj.photoURL});
        refreshUser();
    }
    const onChange = (event)=>{
        const {target:{value}}=event;
        setNewDisplayName(value);
    }
    const onFileChange = (event)=>{
        const {target:{files}} = event;
        const theFile = files[0]; 
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) =>{
            const { currentTarget: {result}} = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }
    const onClearAttachment = () =>{
        setAttachment(null);
    }
    return <>
    <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
            <input type="text" autoFocus placeholder="Display Name" value={newDisplayName} onChange={onChange} className="formInput"/>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id="attach-file"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    style={{
                    opacity: 0,
                    }}
                />
            {attachment &&
                <div className="factoryForm__attachment">
                <img
                  src={attachment}
                  style={{
                    backgroundImage: attachment,
                  }}
                />
                <div className="factoryForm__clear" onClick={onClearAttachment}>
                  <span>Remove</span>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
            }
            <input type="submit" value="Update Profile" className="formBtn" style={{marginTop: 10,}}/>
            
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
            Log Out
        </span>
    </div>
    </>
};
export default Profile;