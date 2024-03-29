import { createStore, combineReducers, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {anecdoteReducer} from './reducers/anecdoteReducer'
import {notificationReducer} from './reducers/notificationReducer'
import {filterReducer} from './reducers/filterReducer'

// Create a combined reducer
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer
})

const store = createStore(
  reducer, 
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
console.log(store.getState())

export default store