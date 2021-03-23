export let encode = (name)=>{
    let numberEncode="";
    for(let i=0;i<name.length;i++){
        if(name[i].charCodeAt(0)%2){
            let ran = Math.floor(Math.random() * 10);
            numberEncode += ran; 
        }
        else{
            numberEncode += 1;
        }
    }
    return Number(numberEncode);
}