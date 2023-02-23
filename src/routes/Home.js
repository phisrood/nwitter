import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { dbService, collection, onSnapshot } from "fBase";
import React, { useEffect, useState } from "react"

const Home = ({userObj}) => {
    const [nweets, setNweets] = useState([]);
    useEffect(() => {
        onSnapshot(collection(dbService, "nweets"), (snapshot)=>{
            const nweetArray = snapshot.docs.map(doc => ({id:doc.id,...doc.data()}));
            setNweets(nweetArray);
        })
    },[])
    
    return (<div className="container">
        <NweetFactory userObj={userObj} />
        <div style={{ marginTop: 30 }}>
            {nweets.map(nweet => 
            <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid }/>)}
        </div>
    </div>)
    };
export default Home;