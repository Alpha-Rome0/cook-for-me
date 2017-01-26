export const CHANGE_PAGE = 'CHANGE_PAGE'

export function addStep(e) {
    return {
        type: ADD_STEP,
        content: e
    }
}

export function changePage(e) {
    return {
        type: CHANGE_PAGE,
        content: e
    }
}
