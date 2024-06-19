import * as sdk from "microsoft-cognitiveservices-speech-sdk"

export async function POST(req: Request) {
  const { question } = await req.json()
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    process.env["SPEECH_KEY"]!,
    process.env["SPEECH_REGION"]!
  )

  speechConfig.speechSynthesisVoiceName = `en-US-EmmaNeural`
  const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig)
  const visemes: number[][] = []
  speechSynthesizer.visemeReceived = function (s, e) {
    // console.log(
    //   "(Viseme), Audio offset: " +
    //     e.audioOffset / 10000 +
    //     "ms. Viseme ID: " +
    //     e.visemeId
    // );
    visemes.push([e.audioOffset / 10000, e.visemeId])
  }
  const audio = await new Promise((resolve, reject) => {
    speechSynthesizer.speakTextAsync(
      question || "I'm excited to try text to speech",
      (result) => {
        const { audioData } = result

        speechSynthesizer.close()

        const base64Audio = Buffer.from(audioData).toString("base64")
        resolve(base64Audio)
      },
      (error) => {
        console.log(error)
        speechSynthesizer.close()
        reject(error)
      }
    )
  })

  return Response.json({
    audio,
    visemes,
  })
}
