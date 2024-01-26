import { sendMessage } from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { AppStateType } from "../../redux/reduxStore";


let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(sendMessage(newMessageBody))
        }
    }
}

export default compose(
    connect(mapStateToProps, { mapDispatchToProps }),
    withAuthRedirect
)(Dialogs)