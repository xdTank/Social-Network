import React from "react";
import s from "./Dialogs.module.css"
import DialogsItems from "./DialogsItems/DialogItems"
import Masseges from "./DialogsItems/Messeges/Messeges";
import { Navigate, Route, Routes, } from "react-router-dom";
import { Field, reduxForm } from "redux-form";



const Dialogs = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(d => <DialogsItems name={d.name} key={d.id} id={d.id} />)
    let massagesElements = state.messages.map(m => <Masseges messages={m.messages} key={m.id} />)

    let addNewMessage = (values) => {
        props.sendMessageCreator(values.newMessageBody)
    }

    if (!props.isAuth)
        return <Routes>
            <Route path="/redirect" element={<Navigate to="/login" />} />
        </Routes>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.masseges}>
                <div>{massagesElements}</div>
            </div>
            <div>
                <AddMessageFormRedux onSubmit={addNewMessage} />
            </div>
        </div>
    )
}

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>

            <div>
                <Field component={"textarea"} name="newMessageBody" placeholder="Enter your message" />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)

export default Dialogs