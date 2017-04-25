export const SET_ROUTE = 'route/SET_ROUTE'
export const setRoute = (route) => {
  return {
    type: SET_ROUTE,
    payload: { route }
  }
}
