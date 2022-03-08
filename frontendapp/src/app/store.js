import { configureStore } from '@reduxjs/toolkit'
import Pass_id_for_song from '../features/Pass_data'
import _song_list_ from '../features/Songs'
import _songs_reviews from '../features/Reviews'
// import JwtAccessToken from '../features/JwtRefreshAccessToken'
import JwtAccessToken from '../features/JwtRefreshAccessToken'
import ProfileData from '../features/ProfileData'
import _IS_ADMIN_STATE_ from '../features/IsAdmin'

export const store = configureStore({
 reducer: {
  _PASS_LIST_ID_SONGS_: Pass_id_for_song,
  _SONGS_: _song_list_,
  _REVIEWS_: _songs_reviews,
  CountJwtRefreshAccessToken: JwtAccessToken,
  _PROFILE_DATA_ : ProfileData,
  ISADMINCOUNTER : _IS_ADMIN_STATE_,
 }
})
