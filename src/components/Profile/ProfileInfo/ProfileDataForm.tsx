import React, { Dispatch, FC, SetStateAction } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { ProfileType } from '../../../types/types';
import userPhoto from "../../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg"
import { profileApi } from '../../../api/profile-api';
import AvatarUploadButton from './UploadButton';

type PropsType = {
    setEditMode: Dispatch<SetStateAction<boolean>>
    profile: ProfileType
    isOwner: boolean
}

const { TextArea } = Input;

const ProfileDataForm: FC<PropsType> = ({ profile, setEditMode, isOwner }) => {
    const [saveProfile] = profileApi.useSaveProfileMutation()

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData)
        setEditMode(false)
    }

    return (
        <Form
            name="profile_form"
            initialValues={{
                fullName: profile.fullName,
                aboutMe: profile.aboutMe,
                lookingForAJob: profile.lookingForAJob,
                lookingForAJobDescription: profile.lookingForAJobDescription,
                contacts: profile.contacts,
                photos: profile.photos,
                userId: profile.userId
            }}
            onFinish={onSubmit}
            layout="vertical"
        >
            <Form.Item>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', maxWidth: '400px' }}>
                    <div>
                        <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', }}>
                            <div>
                                <img src={profile.photos.large || userPhoto} alt="!" style={{ width: '120px', height: '120px' }} />
                            </div>
                            <div>
                                {isOwner && <AvatarUploadButton />}
                            </div>
                        </div>
                        <b>Full Name</b>: <Form.Item name="fullName" noStyle><Input placeholder="Full name" /></Form.Item>
                        <b>Looking for a job</b>: <Form.Item name="lookingForAJob" valuePropName="checked" noStyle><Checkbox /></Form.Item>
                        <div>
                            <b>Description</b>: <Form.Item name="lookingForAJobDescription" noStyle ><TextArea /></Form.Item>
                        </div>
                        <b>About me</b>: <Form.Item name="aboutMe" noStyle><TextArea placeholder="About me" /></Form.Item>
                        <b>Contacts</b>:
                        {Object.keys(profile.contacts).map((key) => (
                            <Form.Item key={key} name={['contacts', key]} noStyle>
                                <Input placeholder={key} />
                            </Form.Item>
                        ))}
                    </div>
                </div>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" style={{ backgroundColor: '#fff' }}>
                    Save
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ProfileDataForm;