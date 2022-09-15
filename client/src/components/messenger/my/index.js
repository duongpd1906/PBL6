import React from 'react'
import { AiOutlineInfoCircle } from "react-icons/ai"

import './my-messenger.scss'

function MyMessages(props) {
    return (
        <div className="my-messages-content">
            <div className="messange">{props.message}</div>
        </div>
    )
}
export default MyMessages;