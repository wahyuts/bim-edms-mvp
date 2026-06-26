export function byId(id) {
  return document.getElementById(id);
}

export function getRoutePath() {
  return window.location.hash.replace("#", "") || "/dashboard";
}

export function navigateTo(route) {
  window.location.hash = route;
}

export function toNumber(value) {
  return Number.parseInt(value, 10) || 0;
}
