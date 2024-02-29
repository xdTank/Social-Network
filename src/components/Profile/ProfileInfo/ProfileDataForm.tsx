import React, { Dispatch, FC, SetStateAction } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { ProfileType } from '../../../types/types';
import { useDispatch } from 'react-redux';
import { saveProfile } from '../../../redux/profileReducer';
import AvatarUploadButton from '../../common/UploadButton/uploadButton';
import userPhoto from "../../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg"

type PropsType = {
    setEditMode: Dispatch<SetStateAction<boolean>>
    profile: ProfileType
    isOwner: boolean
}

const { TextArea } = Input;

const ProfileDataForm: FC<PropsType> = ({ profile, setEditMode, isOwner }) => {

    const dispatch = useDispatch<any>()

    const onSubmit = (formData: ProfileType) => {
        dispatch(saveProfile(formData)).then(
            () => {
                setEditMode(false)
            }
        )
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <img src={profile.photos.large || userPhoto} alt="!" style={{ width: '120px', height: '120px' }} />
                            {isOwner && <AvatarUploadButton />}
                        </div>
                        <b>Full Name</b>: <Form.Item name="fullName" noStyle><Input placeholder="Full name" /></Form.Item>
                        <b>Looking for a job</b>: <Form.Item name="lookingForAJob" valuePropName="checked" noStyle><Checkbox /></Form.Item>
                        <div>
                            <b>Description</b>: <Form.Item name="lookingForAJobDescription"><TextArea rows={4} /></Form.Item>
                        </div>
                        <b>About me</b>: <Form.Item name="aboutMe" noStyle><TextArea rows={4} placeholder="About me" /></Form.Item>
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
                <Button  htmlType="submit" style={{ backgroundColor: '#fff' }}>
                    Save
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ProfileDataForm;