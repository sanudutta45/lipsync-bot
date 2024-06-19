import React, { useState } from "react"
import { ReactNode } from "react"
import welcomeAudio from "./audio_res.json"

export const SpeechContext = React.createContext(null)

type CurrentSpeech = {
  audioPlayer: HTMLAudioElement;
  visemes: [];
}

export const SpeechProvider = ({ children }: { children: ReactNode }) => {
  const [currentSpeech, setCurrentSpeech] = useState<CurrentSpeech | null>(null)
  const [loading, setLoading] = useState(false)

  const textToSpeech = async (question: string) => {
    if (!question) {
      const audioSrc = 'data:audio/mpeg;base64,' + welcomeAudio.audio;
      const audioPlayer = new Audio(audioSrc)
      audioPlayer.onended = () => {
        setCurrentSpeech(null)
      }
      setCurrentSpeech({
        audioPlayer,
        visemes: welcomeAudio.visemes,
      })
      audioPlayer.play()
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      })

      if (res.status === 200) {
        const resJson = await res.json()
        const audioSrc = 'data:audio/mpeg;base64,' + resJson.audio;
        const audioPlayer = new Audio(audioSrc)
        audioPlayer.onended = () => {
          setCurrentSpeech(null)
        }
        setCurrentSpeech({
          audioPlayer,
          visemes: resJson.visemes,
        })
        audioPlayer.play()
      }
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <SpeechContext.Provider value={{ currentSpeech, loading, textToSpeech }}>
      {children}
    </SpeechContext.Provider >

  )

}
