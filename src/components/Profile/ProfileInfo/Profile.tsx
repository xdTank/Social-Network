import React, { FC, useEffect, useState } from "react";
import s from "./ProfileInfo.module.css"
import Status from "./Status";
import ProfileDataForm from "./ProfileDataForm";
import { Avatar, Button, Spin } from "antd";
import { ContactsType, ProfileType, profileApi } from "../../../api/profile-api";
import { useAppSelector } from "../../../hooks/redux";
import { useParams } from "react-router-dom";
import Myposts from "../Myposts/Myposts";
import { useAuthGuard } from "../../../hooks/useAuthGuard";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import { MdEdit } from "react-icons/md";



const Profile: FC = () => {
    const [editMode, setEditMode] = useState(false)
    const id = useAppSelector(state => state.auth.id)
    const { userId } = useParams<{ userId: string }>()

    const { data: profile, } = profileApi.useGetProfileQuery(Number(userId) || id, {
        skip: !userId && !id,
    })

    const { data: status, } = profileApi.useGetStatusQuery(Number(userId) || id, {
        skip: !userId && !id,
    })

    useAuthGuard()
    if (!profile) {
        return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    }
    return (
        <div className={s.profileBlock}>
            <div className={s.ava} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '50px' }}>
                <div>
                    {!editMode && (
                        !profile.photos.large ? (
                            <Avatar icon={<UserOutlined />} size={140} />
                        ) : (
                            <img
                                src={profile.photos.large}
                                alt="!"
                                style={{ width: '160px', height: '160px' }}
                            />
                        )
                    )}
                    <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
                        {!editMode && <Status status={status} isOwner={!userId} />}
                    </div>
                </div>
                <div>
                    {editMode ? <ProfileDataForm setEditMode={setEditMode} profile={profile} isOwner={!userId} /> :
                        <div> <ProfileData profile={profile} isOwner={!userId} onEditMode={() => { setEditMode(true) }} /> </div>}
                </div>
            </div>
            <div>
                {!editMode && <Myposts isOwner={!userId} profile={profile} />}
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
            {isOwner && <Button onClick={onEditMode} style={{ width: '100px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', gap: '5px' }} size="small" ><MdEdit />Edit profile</Button>}
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

export default Profile
