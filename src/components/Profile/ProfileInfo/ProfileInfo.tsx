import React, { ChangeEvent, FC, useState } from "react";
import s from "./ProfileInfo.module.css"
import Preloader from '../../common/Preloader/Preloader'
import StatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg"
import ProfileDataForm from "./ProfileDataForm";
import { ContactsType, ProfileType } from "../../../types/types";
import { useSelector } from "react-redux";
import { selectProfile, selectStatus } from "../../../redux/profileSelector";
import { useDispatch } from "react-redux";
import { savePhoto, saveProfile } from "../../../redux/profileReducer";
import { Button } from "antd";
import AvatarUploadButton from "../../common/UploadButton/uploadButton";

type PropsType = {
    isOwner: boolean
}

const ProfileInfo: FC<PropsType> = ({ isOwner, }) => {

    const profile = useSelector(selectProfile)
    const status = useSelector(selectStatus)

    let [editMode, setEditMode] = useState(false)
    if (!profile) {
        return <Preloader />
    }

    return (
        <div className={s.profileBlock}>

            <div className={s.ava} style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <div>
                    <img src={profile.photos.large || userPhoto} alt="!" />
                    <div style={{ textAlign: 'center' }}>
                        <StatusWithHooks status={status} />
                    </div>
                </div>
                <div>
                    {isOwner && editMode && <AvatarUploadButton />}
                    {editMode ? <ProfileDataForm setEditMode={setEditMode} profile={profile} /> :
                        <div> <ProfileData profile={profile} isOwner={isOwner} onEditMode={() => { setEditMode(true) }} /> </div>}
                </div>
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
    return <div style={{ color: '#DBDEE1' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {profile.fullName}
            <div>
                {isOwner && <Button onClick={onEditMode} style={{ width: '100px', backgroundColor: '#fff', }} size="small" >Edit profile</Button>}
            </div>
        </div>
        <div style={{}}>
            <b>Looking for a job</b>:  {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {
            profile.lookingForAJob &&
            <div>
                {profile.lookingForAJobDescription}
            </div>
        }
        <div>
            {profile.aboutMe}
        </div>
        {
            Object.keys(profile.contacts).length > 0 && (
                <div>
                    <b>Contacts</b>:  {Object.keys(profile.contacts).map(key => {
                        let contactValue = profile.contacts[key as keyof ContactsType]
                        if (contactValue) {
                            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
                        }
                        return null
                    })}
                </div>
            )}

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
