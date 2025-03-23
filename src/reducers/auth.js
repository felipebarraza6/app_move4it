export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem(
        "token",
        JSON.stringify(action.payload.access_token)
      );
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      return {
        ...state,
        isAuth: true,
        token: action.payload.access_token,
        user: action.payload.user,
      };

    case "UPDATE":
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      return {
        ...state,
        isAuth: true,
        user: action.payload.user,
      };

    case "UPDATE_USER":
      return {
        ...state,
        update: state.update + 1,
      };

    case "UPDATE_ACTIVITIES":
      var update_activity = action.update_activity;
      console.log(update_activity);
      console.log(
        state.user.enterprise_competition_overflow.last_competence.stats
          .current_interval_data.user
      );

      const updatedUsers =
        state.user.enterprise_competition_overflow.last_competence.stats.current_interval_data.user.map(
          (user) => {
            if (user.id === update_activity.id) {
              return {
                ...user,
                is_load: true,
              };
            }
            return user;
          }
        );

      const updateIntervals =
        state.user.enterprise_competition_overflow.last_competence.stats.my_team.intervals.map(
          (interval) => {
            if (interval.interval_id === update_activity.interval) {
              const updatedActivities = interval.activities.map((activity) => {
                if (activity.id === update_activity.id) {
                  return {
                    ...activity,
                    is_load: true,
                  };
                }
                return activity;
              });
              return {
                ...interval,
                activities: updatedActivities,
              };
            }
            return interval;
          }
        );

      return {
        ...state,
        user: {
          ...state.user,
          enterprise_competition_overflow: {
            ...state.user.enterprise_competition_overflow,
            last_competence: {
              ...state.user.enterprise_competition_overflow.last_competence,
              stats: {
                ...state.user.enterprise_competition_overflow.last_competence
                  .stats,
                current_interval_data: {
                  ...state.user.enterprise_competition_overflow.last_competence
                    .stats.current_interval_data,
                  user: updatedUsers,
                },
                my_team: {
                  ...state.user.enterprise_competition_overflow.last_competence
                    .stats.my_team,
                  intervals: updateIntervals,
                },
              },
            },
          },
        },
      };

    case "SET_ACTIVITIES":
      return {
        ...state,
        dashboard: { ...state.dashboard, activities: action.payload },
      };

    case "SET_STATS_USER":
      return {
        ...state,
        dashboard: { ...state.dashboard, stats_personal: action.payload },
      };

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuth: false,
        token: null,
        user: null,
      };

    // ... other actions
    default:
      return state;
  }
};
