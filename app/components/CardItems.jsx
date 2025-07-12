import Card from "./Card";

const CardItems = () =>{

    return<>
    <div className="flex gap-5 w-[70%]  items-center mx-auto">

        <Card thumbnail={"images/card1.png"}/>
        <Card thumbnail={"images/card2.png"}/>
        <Card thumbnail={"images/card3.png"}/>
       
    </div>
    </>
}
export default CardItems;