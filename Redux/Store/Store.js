import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
// import storage from "redux-persist/lib/storage";
import {persistReducer} from 'redux-persist';
import createAsyncStorage from 'redux-persist-react-native-async-storage';
import UserReducer from '../Slice/Userslice';
import modalReducer from '../Slice/Modalslice';
import userProfileReducer from '../Slice/UserProfileSlice';

const storage = createAsyncStorage();

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  user: UserReducer,
  Open_Modal: modalReducer,
  userProfile: userProfileReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
});
