import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection, dbService, storageService } from "fBase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const NweetFactory = ({userObj}) =>{
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] =  useState("");
    const onSubmit = async (event) =>{
        if (nweet === "") {
            return;
        }
        event.preventDefault();
        let attachmentUrl="";
        if(attachment !== undefined && attachment !== "" && attachment !== null){
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(fileRef, attachment, "data_url");
            await getDownloadURL(response.ref).then( async (data) => {
                attachmentUrl = data;
            });
        }
        const nweetObj = {
            text:nweet,
            createdAt:Date.now(),
            creatorId:userObj.uid,
            attachmentUrl
        }
        await addDoc(collection(dbService,"nweets"),nweetObj);
        setNweet("");
    }
    const onChange = (event) =>{
        const {target:{value}} = event;
        setNweet(value);
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
        setAttachment("");
    }
    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input className="factoryInput__input" value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
                <input className="factoryInput__arrow" type="submit" value="Nweet"/>
            </div>
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
        </form>
    )
}

export default NweetFactory;