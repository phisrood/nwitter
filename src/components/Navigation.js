import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({userObj}) => <nav>
        <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
            <li>
                <Link to="/" style={{ marginRight: 10 }}>
                    <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
                </Link>
            </li>
            <li><div>
                  
                <Link to="/profile" 
                    style={{
                        marginLeft: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        fontSize: 12,
                    }}
                >
                    {userObj.photoURL ?
                    <div className="navigation__profile">
                    <img
                      src={userObj.photoURL}
                      style={{
                        backgroundImage: userObj.photoURL,
                      }}
                    />
                    </div>
                    :
                    <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x"  />
                    } 
                    
                    <span style={{ marginTop: 10 }}>
                        {userObj.displayName
                        ? `${userObj.displayName}의 Profile`
                        : "Profile"}
                    </span>
                </Link>
                </div>
            </li>
        </ul>
    </nav>
export default Navigation;