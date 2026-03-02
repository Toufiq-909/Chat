import NoiseBackgroundDemo from "./noise-background-demo";
import { TextAnimate } from "./ui/text-animate";

export default function Promo()
{
    return (
       <div className={"relative flex flex-col justify-between items-center  "}>
        <TextAnimate className={"mb-5 mt-6 font-[Inter] font-bold text-xl"} animation="slideUp" by="word"  viewport={{ once: true, amount: 0.3 }}>
      All your conversations in one place.
    </TextAnimate>
        
         <div className={" flex justify-center mb-14"}>
            <img src="/w7.png" className={"w-[90%] md:w-[80%]   rounded-md outline-7 md:outline-12 outline-neutral-700"}/>
            
        </div>
          <div className={"mb-4"}>
            <NoiseBackgroundDemo />
          </div>
       </div>
    )
}