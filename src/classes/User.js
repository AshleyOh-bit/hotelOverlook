class User {
  constructor(num, name) {
    this.id = num;
    this.name = name;
    this.isLoggedIn = false;
    this.username = null;
    this.password = null;
  }
  setCredentials(username, password) {
    if ((!username && !password) || (username.includes(" ") && password.includes(" "))) {
      return `Please enter a username and password with letters, numbers, and symbols`
    } else if (!username || username.includes(" ")) {
      return `Please enter a username with letters, numbers, and symbols`
    } else if (!password || password.includes(" ")) {
      return `Please enter a password with letters, numbers, and symbols`
    } else {
      this.username = username;
      this.password = password
    }
  }
}

export default User;
