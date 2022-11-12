
export  const actionType = {
    SET_PLAY: "SET_PLAY",
    SET_TRACK: "SET_TRACK"
};

export const reducer = (state,action) => {
    const {type, payload} = action;
      switch(type){
          case "SET_TRACK":
            console.log("SET_TRACK",payload.currentTrack)
            localStorage.setItem("CurrentTrack",JSON.stringify(payload.currentTrack))
            return {
                ...state,     
                currentTrack: payload.currentTrack
            }
            default : 
                return state
          
      }
        
}
export default reducer;