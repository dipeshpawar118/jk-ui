export const convertTime = (time)=>{
  if(!time) return""

  return time.split("T")[0]

}