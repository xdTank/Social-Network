import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { profileApi } from '../../../api/profile-api';
import { toast } from 'react-toastify';
import { Button, GetProp, Upload, UploadProps, message } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


const AvatarUploadButton: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [savePhoto] = profileApi.useSavePhotoMutation()


    const beforeUpload = async (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!')
        }
        return isJpgOrPng && isLt2M
    }


    const handleChange: UploadProps['onChange'] = async (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
        }
        if (info.file.status === 'done') {
            try {
                const formData = new FormData()
                formData.append('image', info.file.originFileObj as FileType)
                await savePhoto(formData)
                message.success(`Image uploaded successfully`);
            } catch (e) {
                console.error(e);
                message.error('Error while uploading image');
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <Upload
            name="image"
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            <Button style={{ background: 'white', }} icon={<UploadOutlined />}>{loading ? <LoadingOutlined /> : 'Click to Upload'}</Button>
        </Upload>
    )
}

export default AvatarUploadButton;