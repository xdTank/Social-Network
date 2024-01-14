import React from "react"
import { Input, Textarea, createField } from "../../../FormsControl/FormsControl"
import { reduxForm } from "redux-form"
import style from "../../../FormsControl/FormsControl.module.css"

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}>
        {error && <div className={style.formSummeryError}>{error}</div>}
        <div>
            <button>Save</button>
        </div>
        <div>
            <b>Full Name</b>: {createField("Full name", "fullName", [], Input)}
        </div>
        <div>
            <b>Looking for a job</b>: {createField("", "lookingForAJob", [], Input, { type: "checkbox" })}
        </div>
        <div>
            <b>Description</b>: {createField("Description", "lookingForAJobDescription", [], Textarea)}
        </div>
        <div>
            <b>About me</b>: {createField("About me", "aboutMe", [], Textarea)}
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

const ProfileDataFormReduxForm = reduxForm({ form: 'edit-profile' })(ProfileDataForm)

export default ProfileDataFormReduxForm