// let TimerId ;
// const onTime = (event)=>{
//     if(TimerId){
//         clearTimeout(TimerId);
//     }
//     TimerId = setTimeout(()=>{
//      fecthData(event.target.value);
//     },1000);
// }
const debounce = (func)=>{ //Taking onTime Function.
    let TimerId ;// in js value can't be rebuilt if it has previous value.
    return (...args)=>{ //Taking onTime Function arguments Take only with the help of args.
        if(TimerId){
            clearTimeout(TimerId);
        }
        TimerId = setTimeout(()=>{
            func.apply(null,args);// this function is onTime.
        },1000);
    } // returning another function with the ontime arguments .
}