'hydrate'
import {SkeletonLoader} from "@adaptive-js/components";
import {somar} from "../actions";
import {events, signal} from "@adaptive-js/web";
import {ClientComponet} from "./client";

export const HydrateComponet = () => {


    const [test,setTest] = signal(0)

    events(() => {
        console.log(test())
    })

    return (
        <div onClick={() => {
            somar(5,10).then(value =>   setTest(  value ) )

        }} >Hydrate Render</div>
    )
}

export const HydrateComponetChildClient = () => {

    return (<div>
            <div>Hydrate Render Filho</div>
            <SkeletonLoader  theme={ "light" } animated={true} variant={"rectangular"} />
            <ClientComponet/>
    </div>



    )
}


export const HydrateComponetErrorDigito = () => {

    return (<>
            <div>Hydrate Render</div>

        </>

    )
}