// ✅ Validate Email
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ✅ Validate Password
// - At least 6 characters
// - Must contain 1 letter and 1 number
export function validatePassword(password: string): boolean {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return re.test(password);
}
