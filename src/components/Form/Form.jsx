import React, {useCallback, useEffect, useState} from 'react';
import "./Form.css"
import {useTelegram} from "../../hook/useTelegram";

const Form = () => {
    const [word, setWord] = useState("")
    const [definition, setDefinition] = useState("")
    const {tg} = useTelegram()

    useEffect(() => {
        tg.MainButton.setParams({
            text: "Далі"
        })
    }, [])
    const onSendData = useCallback(() => {
        const data = {
            word,
            definition
        }
        tg.sendData(JSON.stringify(data))
    }, [word, definition])
    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])
    useEffect(() => {
        if (!definition || !word) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [word, definition])
    return (
        <div className={"form"}>
            <h1>Введіть дані </h1>
            <label className={"label"}>Word</label>
            <input placeholder={"write word"} type={"text"} className={"input"} value={word}
                   onChange={e => setWord(e.target.value)}/>
            <label className={"label"}>Definition</label>
            <input placeholder={"write definition of word"} type={"text"} className={"input"} value={definition}
                   onChange={e => setDefinition(e.target.value)}/>
        </div>
    );
};

export default Form;