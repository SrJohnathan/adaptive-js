'client'

import {events, signal} from "@adaptive-js/web";


export const ClientComponet = () => {

    const [test,setTest] = signal(0)

    events(() => {
        console.log(test())
    })

    return (
        <div onClick={() => {
            setTest(test()  + 1)
        }} >Cliente Render</div>
    )
}
