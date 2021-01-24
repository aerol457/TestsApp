const updateObject = (oldObject, updatedProps) => {
  return {
    ...oldObject,
    ...updatedProps,
  };
};

export default updateObject;
