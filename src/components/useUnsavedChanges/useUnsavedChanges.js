import { useEffect, useState } from "react"
import { Prompt } from "react-router-dom";

const useUnsavedChanges = (neurons) =>{
    const [isDirty, setDirty] = useState(false);
    const message = "Are you sure you want to exit without saving your system?"
    useEffect(()=>{
        function handleUnsavedChanges (){
            console.log("isDirty:" + isDirty);
            if(isDirty){
                console.log(JSON.stringify(neurons));
                window.localStorage.setItem('neurons', JSON.stringify(neurons));
                console.log(JSON.parse(window.localStorage.getItem('neurons')));
            }
        }
        window.onbeforeunload = isDirty && (() => message);

        window.addEventListener("beforeunload", handleUnsavedChanges);
        return () => {
            window.removeEventListener("beforeunload", handleUnsavedChanges);
            window.onbeforeunload = null;
        }
    },[isDirty]);
    const routerPrompt = <Prompt when={isDirty} message={message} />
    return [routerPrompt, ()=>setDirty(true), ()=>setDirty(false)];
}
export default useUnsavedChanges;