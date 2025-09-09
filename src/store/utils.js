export const onStartActions = [
    "Server/all",
    "Groups/all"
];

export const doOnStartActions = (store) => {
  onStartActions.forEach((action) => {
    store.dispatch(action);
  });
};
