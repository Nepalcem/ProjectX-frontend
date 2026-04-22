// Keep in sync with BackEnd!!
//email - at least one character before and after @, at least two characters after last dot
const emailRegExp: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

//password - at least 8 characters, at least one uppercase letter, one lowercase letter, and one number or special character
const passwordRegExp: RegExp =
  /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  
//nickname - 3 to 24 characters, letters, numbers, and underscores only
const nicknameRegExp: RegExp = /^[a-zA-Z0-9_]{3,24}$/;

export { emailRegExp, passwordRegExp, nicknameRegExp };