export function useGetUserId() {
  return window.localStorage.getItem("userId");
}
