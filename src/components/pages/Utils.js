import axios from 'axios'
// function for changing color of heart icon
export const changeHeartIconColor = (goodSn, favoritState,element) => {
    axios.get('https://starfoods.ir/api/setFavorite',{params:{
        goodSn:goodSn
    }}).then((data)=>{
        // element.classList.addClass("defaultHeartColor")
    })
};