import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, dbService, deleteDoc, deleteObject, doc, getDoc, ref, storageService, updateDoc } from "fBase";
import React, { useState } from "react";

const Nweet = ({nweetObj, isOwner}) =>{
    const [editing, setEditing ]=useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const nWeetDocRef = doc(dbService, `nweets/${nweetObj.id}`);
    const onDeleteClick = async () =>{
        const ok = window.confirm("delete?");
        if(ok){
            await deleteDoc(nWeetDocRef);
            await deleteObject(ref(storageService, nweetObj.attachmentUrl));
        }
    }
    const toggleEditing =()=>{
        setEditing(prev => !prev);
    }
    const onSubmit = async (event) =>{
        event.preventDefault();
        await updateDoc(nWeetDocRef, {text:newNweet});
        setEditing(false);
    }
    const onChange = (event) =>{
        const {target:{value}}=event;
        setNewNweet(value);
    }
    return (
    <div className="nweet">
        {
            editing ? 
            <>
            <form onSubmit={onSubmit} className="container nweetEdit">
                <input type="text" onChange={onChange} value={newNweet} required />
                <input type="submit" value="Update Nweet" className="formBtn"/>
            </form>
            <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
            </>
            :
            <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl &&(
                <img src={nweetObj.attachmentUrl} />
            )
            }
            <div class="nweet__actions">
                <span onClick={onDeleteClick}>
                    <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditing}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </span>
            </div>
            </>
        }
    </div>
)}

export default Nweet;