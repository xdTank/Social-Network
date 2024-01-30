import React, { ChangeEvent, FC, useEffect, useState } from "react";
type PropsType = {
    status: string
    updateStatus: (status: string) => void
}
const StatusWithHooks: FC<PropsType> = (props) => {

    let [editMode, setEditMede] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMede(true)
    }
    const deactivateEditMode = () => {
        setEditMede(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div>
            {!editMode &&
                <div>
                    <b>Status</b>: <span onDoubleClick={activateEditMode} >{props.status || "-"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
                </div>
            }
        </div>
    )
}

export default StatusWithHooks