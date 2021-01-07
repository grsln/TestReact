export default function authHeader() {
  const currentUser = localStorage.getItem("user");
  const user = JSON.parse(currentUser ? currentUser : "");

  if (user && user.token.access) {
    // return { Authorization: 'Bearer ' + user.token.access };
    return { Authorization: "JWT " + user.token.access };
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {};
  }
}
