const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        token: null,
        user: null,
        isFetching: true,
        error: false,
      };

    case "LOGIN_SUCCESS":
      return {
        token: action.payload.token,
        user: action.payload.user,
        isFetching: false,
        error: false,
      };

    case "LOGIN_FAILURE":
      return {
        token: null,
        user: null,
        isFetching: false,
        error: true,
      };

    case "LOGOUT":
      return {
        token: null,
        user: null,
        isFetching: false,
        error: false
      }
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "JOIN_FORUM":
      return {
        ...state,
        user: {
          ...state.user,
          forumsJoined: [...state.user.forumsJoined, action.payload]
        }
      }
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
    case "LEAVE_FORUM":
      return {
        ...state,
        user: {
          ...state.user,
          forumsJoined: state.user.forumsJoined.filter((forum) => forum !== action.payload)
        }
      }
    default:
      return state;
  }
};

export default AuthReducer;
