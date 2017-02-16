export const ADD_STEP = 'ADD_STEP'
export const REMOVE_STEP = 'REMOVE_STEP'
export const SUBMIT_RECIPE = 'SUBMIT_RECIPE'
export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
export const UPDATE_TITLE = 'UPDATE_TITLE'
export const UPDATE_DESCRIPTION_DURATION = 'UPDATE_DESCRIPTION_DURATION'
export const UPDATE_DESCRIPTION_SUMMARY = 'UPDATE_DESCRIPTION_SUMMARY'


export function addStep(e) {
    return {
        type: ADD_STEP,
        content: e
    }
}

export function removeStep(i) {
    return {
        type: REMOVE_STEP,
        index: i
    }
}

export function addIngredient(ingredient) {
    return {
        type: ADD_INGREDIENT,
        ingredient
    }
}

export function removeIngredient(i) {
    return {
        type: REMOVE_INGREDIENT,
        index: i
    }
}

export function updateTitle(title) {
    return {
        type: UPDATE_TITLE,
        title
    }
}

export function updateDuration(duration) {
    return {
        type: UPDATE_DESCRIPTION_DURATION,
        duration
    }
}

export function updateSummary(summary) {
    return {
        type: UPDATE_DESCRIPTION_SUMMARY,
        summary
    }
}

export function submitRecipe() {
    return {
        type: SUBMIT_RECIPE
    }
}

