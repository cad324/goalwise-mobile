import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import accountabilityScoreReducer from './features/accountabilityScore';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        accountabilityScore: accountabilityScoreReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch