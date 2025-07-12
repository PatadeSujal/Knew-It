const Card = ({thumbnail}) =>{
    return<>
        <div className="card-container w-[27%] ">
            <img src={thumbnail} alt="" />
        </div>
    </>
}
export default Card;