export const convertDate = (num) =>{
    var myDate = new Date(num);
    return myDate.getDate() + "/" + (myDate.getMonth()+1);
}