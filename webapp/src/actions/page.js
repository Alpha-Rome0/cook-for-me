export const CHANGE_PAGE = 'CHANGE_PAGE'

export function changePage(e) {
    return {
        type: CHANGE_PAGE,
        content: e
    }
}
