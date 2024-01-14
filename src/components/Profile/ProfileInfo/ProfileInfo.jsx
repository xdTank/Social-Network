import React, { useState } from "react";
import s from "./ProfileInfo.module.css"
import Preloader from '../../common/Preloader/Preloader'
import StatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg"
import ProfileDataForm from "./ProfileDataForm";



const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader />
    }

    const onPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
    }
    return (
        <div className={s.profileBlock}>
            <div className={s.ava}>
                <img src={profile.photos.large || userPhoto} alt="!" />
                {isOwner && <input id="input" type={'file'} onChange={onPhotoSelected} />}
                {editMode ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} /> :
                    <div> <ProfileData profile={profile} isOwner={isOwner} onEditMode={() => { setEditMode(true) }} /> </div>}
            </div>
            <div className={s.descriptionBlock}>
                <StatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
        </div>
    )
}

const ProfileData = ({ profile, isOwner, onEditMode }) => {
    return <div>
        <div>
            {isOwner && <button onClick={onEditMode}>Edit</button>}
        </div>
        <div>
            <b>Full Name</b>:  {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>:  {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {
            profile.lookingForAJob &&
            <div>
                <b>Description</b>:  {profile.lookingForAJobDescription}
            </div>
        }
        <div>
            <b>About me</b>:  {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>:  {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })}
        </div>


    </div >
}

const Contact = ({ contactTitle, contactValue }) => {
    return <div className={s.contacts}>
        <b>{contactTitle}</b>: {contactValue}
    </div>
}

export default ProfileInfo
