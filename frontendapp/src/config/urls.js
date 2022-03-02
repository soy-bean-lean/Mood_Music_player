export const MAIN_URL = "http://localhost:8000"
// export const MAIN_FRONT_URL = "http://localhost:3000"
export const MAIN_FRONT_URL = "http://localhost:8000"
// export const PORT = ":3000"
export const PORT = ":8000"

export const ANALYTIC_URL_FOR_PIE_CHART = MAIN_URL + "/image/uploads/_data_in_pie_/data/show"
export const ON_PAYMENT_SUCCESS = MAIN_FRONT_URL + "/payment/subcription/success"
export const ON_PAYMENT_FAIL =  MAIN_FRONT_URL + "/payment/subcription/failed"

// export const GET_SET_SUBCRIPTION_DATA = MAIN_URL + "/payments_check/_admin_set_subcription/___data___/"
export const GET_SET_SUBCRIPTION_DATA = MAIN_URL + "/payments_check/_admin_set_subcription/___data___readonly__/"
export const GET_SET_SUBCRIPTION_DATA_READONLY_ = MAIN_URL + "/payments_check/_admin_set_subcription/___data___readonly__/"

export const BACK_END_REFRESH_TOKEN = MAIN_URL + "/accounts/accounts_data/token/refresh/"
export const BACK_END_REFRESH_TOKEN_AFTER_VERIFICATION = MAIN_URL + "/accounts/token/new/"
export const BACKEND_URL_LOGOUT= MAIN_URL + "/logout/"

export const BACKEND_ALL_SINGUP = MAIN_URL + "/auth/users/"
export const BACKEND_ALL_ACTIVATION = MAIN_URL + "/auth/users/activation/"

export const BACKEND_RESEND_ACTIVATION = MAIN_URL + "/auth/users/resend_activation/"
export const BACKEND_RESET_PASSWORD = MAIN_URL + "/auth/users/reset_password/"
export const BACKEND_RESET_FINAL_PASSWORD = MAIN_URL + "/auth/users/reset_password_confirm/"


export const BACKEND_URL_LOGIN = MAIN_URL +  "/accounts/accounts_data/token/"

export const BACKEND_POST_NEW_PROFILE = MAIN_URL + "/updateuserdata/_update_data_/"
export const BACKEND_POST_NEW_PASSWORD = MAIN_URL + "/auth/users/set_password/"


export const BACKENDURL_FOR_SONGS = MAIN_URL + "/image/uploads/upload/image/"
export const BACKENDURL_SERVER_SONGS = MAIN_URL + "/data/upload/songs/_songs_/"
export const BACKENDURL_SERVER_SONGS_FOR_ADMIN = MAIN_URL + "/data/upload/songs/_admin_/"
export const BACKENDURL_FOR_TRENDING = MAIN_URL + "/api/trending_songs/"

export const SONGS_URL = MAIN_URL + "/data/"

export const BACKEND_URL_REVIEWS_ADD = MAIN_URL + "/api/add/reviews/"
export const BACKEND_URL_REVIEWS_SHOW = MAIN_URL + "/api/reviews/"


export const GET_USER_DATA = MAIN_URL + "/user/data/"
export const GET_PROFILE_PICTURE = MAIN_URL + "/data/"
