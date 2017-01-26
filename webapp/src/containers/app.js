import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import App from '../components/app'
import {addStep, removeStep, submitRecipe} from '../actions/steps'

function mapStateToProps(state) {
    return {
        steps:state.stepReducer,
        page: state.pageReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addStep(content) {
            dispatch(addStep(content))
        },
        removeStep(id) {
            dispatch(removeStep(id))
        },
        submitRecipe() {
            dispatch(submitRecipe())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)