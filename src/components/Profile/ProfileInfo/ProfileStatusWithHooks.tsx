import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateStatus } from "../../../store/reducers/profileReducer";
type PropsType = {
    status: string
}
const StatusWithHooks: FC<PropsType> = (props) => {

    let [editMode, setEditMede] = useState(false)
    let [status, setStatus] = useState(props.status)

    const dispatch = useDispatch<any>()

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMede(true)
    }
    const deactivateEditMode = () => {
        setEditMede(false)
        dispatch(updateStatus(status))
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div style={{ color: '#DBDEE1' }}>
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