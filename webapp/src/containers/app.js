import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import App from '../components/app'
import {addStep, removeStep, submitRecipe, addIngredient, removeIngredient, updateTitle, updateDuration, updateSummary} from '../actions/steps'
import {changePage} from '../actions/page'

function mapStateToProps(state) {
    return {
        title: state.stepReducer.title,
        steps: state.stepReducer.steps,
        ingredients: state.stepReducer.ingredients,
        duration: state.stepReducer.description.duration,
        summary: state.stepReducer.description.summary,
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
        addIngredient(i) {
            dispatch(addIngredient(i))
        },
        removeIngredient(i) {
            dispatch(removeIngredient(i))
        },
        updateTitle(t) {
            dispatch(updateTitle(t))
        },
        updateDuration(d) {
            dispatch(updateDuration(d))
        },
        updateSummary(s) {
            dispatch(updateSummary(s))
        },
        submitRecipe() {
            dispatch(submitRecipe())
        },
        changePage(page) {
            dispatch(changePage(page))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)