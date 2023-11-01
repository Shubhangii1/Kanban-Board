import React ,{useState}from "react";
import './Card.css'
import Chip from "../Chip/Chip";
import { MoreHorizontal } from 'react-feather';
import {Circle} from 'react-feather';
import Dropdown from "../Dropdown/Dropdown";

function Card({ticket}){
   const [showDropdown,setShowDropdown]=useState(false);
    return(
        <div className="card">
            <div className="card_top">
                <div className="card_top_labels">
                    <Chip text="CAM-1" color="gray"/>
                </div>
                <div className="card_top_more" onClick={()=>
                setShowDropdown(true)}>
                <MoreHorizontal/>
                {showDropdown && (
                    <Dropdown onClose={()=>setShowDropdown(false)}>
                        <div className="card_dropdown">
                            <p>Delete Card</p>
                        </div>
                    </Dropdown>
                )}
                </div>
            </div>
            <div className="card_title">
                {ticket.title}
            </div>
            <div className="card_footer">
                <p><MoreHorizontal/></p>
                <p><Circle/> {ticket.feature}</p>
            </div>
            
        </div>
    )
}
export default Card;