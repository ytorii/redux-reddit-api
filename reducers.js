import { combineReducers } from 'redux'
import * as Actions from './actions'

const selectedSubreddit = (state = 'reactjs', action)  => {
  switch (action.type){
    case Actions.SELECT_SUBREDDIT:
      return action.subreddit
    default:
        return state
  }
}

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type){
    case Actions.INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case Actions.REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case Actions.RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: action.receivedAt,
        items: action.posts
      })
    default:
      return state
  }
}

const postsBySubreddit = (state = {}, action) => {
  switch (action.type){
    case Actions.INVALIDATE_SUBREDDIT:
    case Actions.REQUEST_POSTS:
    case Actions.RECEIVE_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
})

export default rootReducer
