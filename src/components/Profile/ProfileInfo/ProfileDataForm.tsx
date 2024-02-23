import React, { Dispatch, FC, SetStateAction } from 'react';
import { Field, Form, Formik } from 'formik';
import { Button } from 'antd';
import { ProfileType } from '../../../types/types';
import { useDispatch } from 'react-redux';
import { saveProfile } from '../../../redux/profileReducer';
type PropsType = {
    setEditMode: Dispatch<SetStateAction<boolean>>
    profile: ProfileType
}
const ProfileDataForm: FC<PropsType> = ({ setEditMode, profile }) => {
    const dispatch = useDispatch<any>()
    const onSubmit = (formData: ProfileType) => {
        dispatch(saveProfile(formData)).then(
            () => {
                setEditMode(false)
            }
        )
    }

    return (
        <div>
            <Formik
                initialValues={{
                    fullName: profile.fullName,
                    aboutMe: profile.aboutMe,
                    lookingForAJob: profile.lookingForAJob,
                    lookingForAJobDescription: profile.lookingForAJobDescription,
                    contacts: profile.contacts,
                    photos: profile.photos,
                    userId: profile.userId
                }}
                enableReinitialize={true}
                onSubmit={onSubmit}

            >
                {({
                    handleSubmit, isSubmitting, 
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <div>
                            <b>Full Name</b>: <Field type='input' name='fullName' placeholder='Full name' />
                        </div>
                        <div>
                            <b>Looking for a job</b>: <Field type='checkbox' name='lookingForAJob' />
                        </div>
                        <div>
                            <b>Description</b>: <Field type='textarea' name='lookingForAJobDescription' />
                        </div>
                        <div>
                            <b>About me</b>: <Field type='textarea' name='aboutMe' placeholder='About me' />
                        </div>
                        <div>
                            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                                return <div key={key}>
                                    <b>{key}</b>: <Field placeholder={key} name={`contacts.${key}`} type='input' />
                                </div>
                            })}
                        </div>
                        <button type='submit' disabled={isSubmitting}>
                            <Button>
                                Save
                            </Button>
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ProfileDataForm;