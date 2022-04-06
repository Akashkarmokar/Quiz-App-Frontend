export default function({route,redirect,params}){
    const levelName = ['easy','medium','hard'];
    const routerName = route.name;
    let ok = false;
    levelName.forEach((value)=>{
        if(value === params.levelName){
            ok = true;
        }
    })
    if(!ok){
        redirect('/not-found');
    }
}