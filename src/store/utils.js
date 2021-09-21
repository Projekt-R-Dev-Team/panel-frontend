export const onStartActions = [
    "Server/all"
];

export const doOnStartActions = store => {
    onStartActions.forEach(action => {
        store.dispatch(action);
    })
}
