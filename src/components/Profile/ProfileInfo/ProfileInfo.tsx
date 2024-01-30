import React, { ChangeEvent, FC, useState } from "react";
import s from "./ProfileInfo.module.css"
import Preloader from '../../common/Preloader/Preloader'
import StatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg"
import ProfileDataForm from "./ProfileDataForm";
import { ContactsType, ProfileType } from "../../../types/types";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (starus: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: FC<PropsType> = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
    let [editMode, setEditMode] = useState(false)
    if (!profile) {
        return <Preloader />
    }

    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData: ProfileType) => {
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

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    onEditMode: () => void
}
const ProfileData: FC<ProfileDataPropsType> = ({ profile, isOwner, onEditMode }) => {
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
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
            })}
        </div>


    </div >
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}
const Contact: FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
    return <div className={s.contacts}>
        <b>{contactTitle}</b>: {contactValue}
    </div>
}

export default ProfileInfo
