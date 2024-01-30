import React, { FC } from "react";
import s from "./Dialogs.module.css"
import DialogsItems from "./DialogsItems/DialogItems"
import Masseges from "./DialogsItems/Messeges/Messeges";
import { InjectedFormProps, reduxForm } from "redux-form";
import { Textarea, createField } from "../../FormsControl/FormsControl";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { InitialStateType } from "../../redux/dialogsReducer";

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

const Dialogs: FC<PropsType> = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(d => <DialogsItems name={d.name} key={d.id} id={d.id} />)
    let massagesElements = state.messages.map(m => <Masseges message={m.message} key={m.id} id={m.id} />)

    let addNewMessage = (values: NewMessageFormType) => {
        props.sendMessage(values.newMessageBody)
    }
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

type NewMessageFormType = {
    newMessageBody: string
}

type NewMessageValuesKeysType = keyof NewMessageFormType
const AddMessageForm: FC<InjectedFormProps<NewMessageFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageValuesKeysType>("Enter your message", "newMessageBody", [required, maxLengthCreator(100)], Textarea)}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
const AddMessageFormRedux = reduxForm<NewMessageFormType>({ form: 'dialogAddMessageForm' })(AddMessageForm)

export default Dialogs