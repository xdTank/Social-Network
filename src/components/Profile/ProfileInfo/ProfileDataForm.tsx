import React, { FC, useEffect } from "react"
import { GetStringKeys, Input, Textarea, createField } from "../../../FormsControl/FormsControl"
import { InjectedFormProps, reduxForm } from "redux-form"
import style from "../../../FormsControl/FormsControl.module.css"
import { ProfileType } from "../../../types/types"
import { Button } from "antd"



type PropsType = {
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}  >
        {error && <div className={style.formSummeryError}>{error}</div>}
        <div>
            <Button onClick={handleSubmit}>Save</Button>
        </div>
        <div>
            <b>Full Name</b>: {createField<ProfileTypeKeys>("Full name", "fullName", [], Input)}
        </div>
        <div>
            <b>Looking for a job</b>: {createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, { type: "checkbox" })}
        </div>
        <div>
            <b>Description</b>: {createField<ProfileTypeKeys>("Description", "lookingForAJobDescription", [], Textarea)}
        </div>
        <div>
            <b>About me</b>: {createField<ProfileTypeKeys>("About me", "aboutMe", [], Textarea)}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key={key}>
                    <b>{key}</b>: {createField(key, "contacts" + key, [], Input)}
                </div>
            })}
        </div>

    </form >
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({ form: 'edit-profile', enableReinitialize: true })(ProfileDataForm)


export default ProfileDataFormReduxForm