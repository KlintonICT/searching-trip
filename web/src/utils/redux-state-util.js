const StateUtil = {
  setRequest: (name, state) => {
    return {
      ...state,
      [`isLoading${name}`]: true,
      [`isError${name}`]: false,
    };
  },

  setSuccess: (name, state) => {
    return {
      ...state,
      [`isLoading${name}`]: false,
      [`isError${name}`]: false,
    };
  },

  setFailure: (name, state) => {
    return {
      ...state,
      [`isLoading${name}`]: false,
      [`isError${name}`]: true,
    };
  },
};

export default StateUtil;
