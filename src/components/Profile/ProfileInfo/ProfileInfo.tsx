import React, { FC, useEffect, useState } from "react";
import s from "./ProfileInfo.module.css"
import Preloader from '../../common/Preloader/Preloader'
import Status from "./Status";
import userPhoto from "../../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg"
import ProfileDataForm from "./ProfileDataForm";
import { ContactsType, ProfileType } from "../../../types/types";
import { Button } from "antd";
import { profileApi } from "../../../api/profile-api";
import { useAppSelector } from "../../../hooks/redux";
import { useParams } from "react-router-dom";



const ProfileInfo: FC = () => {
    const {id} = useAppSelector(state => state.auth)
    const { userId } = useParams<{ userId: string }>()
    const [editMode, setEditMode] = useState(false)

    const parsedUserId = userId ? parseInt(userId) : null
    const parsedId = id ? parseInt(id.toString()) : null


    const { data: profile, refetch: refetchProfile } = profileApi.useGetProfileQuery(parsedUserId || parsedId)
    const { data: status, refetch: refetchStatus } = profileApi.useGetStatusQuery(parsedUserId || parsedId)


    useEffect(() => {
        if (parsedUserId && parsedId  !== parsedId) {
            refetchProfile()
            refetchStatus()
        }
    }, [parsedUserId, parsedId])


    if (!profile) {
        return <Preloader />
    }
    return (
        <div className={s.profileBlock}>
            <div className={s.ava} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '50px' }}>
                <div>
                    {!editMode && <img src={profile.photos.large || userPhoto} alt="!" />}
                    <div style={{ textAlign: 'center' }}>
                        {!editMode && <Status status={status} />}
                    </div>
                </div>
                <div>
                    {editMode ? <ProfileDataForm setEditMode={setEditMode} profile={profile} isOwner={!userId} /> :
                        <div> <ProfileData profile={profile} isOwner={!userId} onEditMode={() => { setEditMode(true) }} /> </div>}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {profile.fullName}
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
        <div style={{ margin: '20px' }}>
            {isOwner && <Button onClick={onEditMode} style={{ width: '100px', backgroundColor: '#fff', }} size="small" >Edit profile</Button>}
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
