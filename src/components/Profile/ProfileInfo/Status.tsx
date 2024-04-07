import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { profileApi } from "../../../api/profile-api";
import { Input } from "antd";
type PropsType = {
    status: string | undefined
}
const Status: FC<PropsType>= ({ status }) => {
    const [updateStatus] = profileApi.useUpdateStatusMutation()
   

    const [isEditMode, setIsEditMede] = useState(false)
    const [statusValue, setStatusValue] = useState(status)
    useEffect(() => {
        setStatusValue(status)
    }, [status])

    const activateEditMode = () => {
        setIsEditMede(true)
    }
    const deactivateEditMode = () => {
        setIsEditMede(false)
            updateStatus(statusValue)   
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatusValue(e.currentTarget.value)
    }
    return (
        <div style={{ color: '#DBDEE1' }}>
            {!isEditMode &&
                <div onDoubleClick={activateEditMode}>
                    <b>Status</b>: <span style={{ color: '#DBDEE1' }}>{status || "-"}</span>
                </div>
            }
            {isEditMode &&
                <div>
                    <Input onChange={onStatusChange} onBlur={deactivateEditMode} value={statusValue} autoFocus />
                </div>
            }
        </div>
    )
}

export default Status