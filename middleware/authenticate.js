export default function(context){
    // console.log('It is authentication middleware');
    // console.log(context.store.state.authUser);
    const isAuthenticate = context.store.state.authUser === false ? false : true;
    if(!isAuthenticate){
        context.redirect({name:'login'});
    }
}