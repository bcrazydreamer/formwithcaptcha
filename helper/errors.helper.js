module.exports = {
    "server_error"              : [500, "Something went wrong"],
    "invalid_email"             : [400, "The email you entered is invalid"],
    "invalid_name"              : [400, "The name you entered is invalid"],
    "password_small"            : [400, "Password must be atleast 6 digit"],
    "password_alpha_num"        : [400, "Password must contain atleast one number or one alphabet"],
    "invalid_password"          : [400, "Invalid password"],
    "user_not_found"            : [404, "User not exist with this email"],
    "email_taken"               : [409, "This email is already taken"],
    "unauthorised"              : [401, "Unauthorised"],
    "form_session_expired"      : [401, "Form session expired"],
    "captcha_verify_fail"       : [401, "Captcha verification failed"]
}