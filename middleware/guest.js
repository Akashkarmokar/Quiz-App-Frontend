export default function(context){
    const isGuest = context.store.state.authUser === false ? true : false;
    if(!isGuest){
        context.redirect({name:'index'})
    }
}