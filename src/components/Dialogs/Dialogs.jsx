import React from "react";
import s from "./Dialogs.module.css"
import DialogsItems from "./DialogsItems/DialogItems"
import Masseges from "./DialogsItems/Messeges/Messeges";




const Dialogs = (props) => {

    let state = props.dialogsPage

    let dialogsElements = props.state.dialogs.map(d => <DialogsItems name={d.name} key={d.id} id={d.id} />)
    let massagesElements = props.state.massage.map(m => <Masseges masseges={m.masseges} key={m.id} />)
    let newMessageBody = props.state.newMessageBody
    let newText = React.createRef();
    let onSendMessageClick = () => {
        props.sendMessageCreator()
    }
    let onNewMassageChange = (e) => {
        let body = e.target.value
        props.updateNewMessageBodyCreator(body)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.masseges}>
                <div>{massagesElements}</div>
                <div>
                    <div>
                        <textarea value={newMessageBody}
                            onChange={onNewMassageChange}
                            placeholder="Enter your message" ref={newText}></textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs