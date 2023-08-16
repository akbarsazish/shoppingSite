import axios from 'axios'
// function for changing color of heart icon
export const changeHeartIconColor = (goodSn, favoritState,element) => {
    axios.get('http://192.168.10.33:8080/api/setFavorite',{params:{
        goodSn:goodSn
    }}).then((data)=>{
        // element.classList.addClass("defaultHeartColor")
    })
};