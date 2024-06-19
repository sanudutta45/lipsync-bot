'use client'
import { SpeechContext } from '@/context/SpeechProvider'
import React, { useContext, useRef } from 'react'

const UI = () => {
    const context = useContext(SpeechContext)

    const { loading, textToSpeech, currentSpeech } = context
    const input = useRef();

    const convertTextToSpeech = (e) => {
        e.preventDefault()
        if (!input.current) return
        const text = input.current.value;
        if (!loading && !currentSpeech) {
            textToSpeech(text)
            input.current.value = "";
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-end p-4 flex-col pointer-events-none">
            <form onSubmit={convertTextToSpeech}>
                <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
                    <input
                        className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
                        placeholder="Type a message..."
                        ref={input}
                    />
                    <button
                        type='submit'
                        disabled={loading || currentSpeech}
                        // onClick={sendMessage}
                        className={`bg-pink-500 hover:bg-pink-600 text-white p-4 px-10 font-semibold uppercase rounded-md
                    }`}
                    >
                        Talk
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UI