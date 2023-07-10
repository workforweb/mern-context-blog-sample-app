import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  SET_POST,
  GET_POST,
  CLEAR_POST,
  UPDATE_POST,
  CLEAR_POSTS,
  POST_ERROR,
  CLEAR_ERRORS,
} from './types';

export default (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case UPDATE_POST:
      const updatePost = action.payload;

      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === updatePost.id ? updatePost : post
        ),
        loading: false,
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
        loading: false,
      };
    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        post: {},
        error: null,
      };
    case SET_POST:
    case GET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case CLEAR_POST:
      return {
        ...state,
        post: null,
      };
    // case FILTER_POSTS:
    //   return {
    //     ...state,
    //     filtered: state.posts.filter((post) => {
    //       const regex = new RegExp(`${action.payload}`, 'gi');
    //       return post.name.match(regex) || post.email.match(regex);
    //     }),
    //   };
    // case CLEAR_FILTER:
    //   return {
    //     ...state,
    //     filtered: null,
    //   };
    // case POST_ERROR:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        posts: [],
        post: {},
        error: null,
      };
    default:
      return state;
  }
};
