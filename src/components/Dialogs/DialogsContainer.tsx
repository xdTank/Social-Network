import { actions } from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { AppStateType } from "../../redux/reduxStore";
import { ComponentType } from "react";


let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch: (arg0: any) => void) => {
    return {
        sendMessage: (newMessageBody: any) => {
            dispatch(actions.sendMessage(newMessageBody))
        }
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, { mapDispatchToProps }),
    withAuthRedirect
)(Dialogs)