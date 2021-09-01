import { configureStore } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'

import { updateVersion } from './global/actions'
import application from './application/reducer'
import multicall from './multicall/reducer'
import transactions from './transactions/reducer'

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists']

const store = configureStore({
    reducer: {
        application,
        multicall,
        transactions,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true })
        .concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
    preloadedState: load({ states: PERSISTED_KEYS, disableWarnings: process.env.NODE_ENV === 'test' }),
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
