export const SET_ACTIVE_ROUTE = 'SET_ACTIVE_ROUTE';

export function setActiveRoute(route) {
  return { type: SET_ACTIVE_ROUTE, payload: route };
}
