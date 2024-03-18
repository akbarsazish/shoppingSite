import starfood from "../../assets/images/starfood.png";
const Loader = () => {
    const loader = {
        margin: "0",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "222px",
        height: "100px",
        backgroundColor: "transparent",
        borderRadius: "4px",
        backgroundColor: "gray",
    }
    return (
        <span className="text-center loader" type="button" disabled style={loader}>
            <span style={{color:"white", fontSize:"2rem", fontWeight:"bold"}}> استارفود </span>
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            <img src={starfood} alt="starfood" style={{width:"55px",height:"55px",marginTop:"1rem", position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)"}}/>
        </span>
    )
}


export default Loader;