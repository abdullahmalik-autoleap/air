import type { IVoiceProvider, Voice } from "./types"

export class ElevenLabsClient implements IVoiceProvider {
  async listVoices(): Promise<Voice[]> {
    return [
      { id: "voice_1", name: "Avery", previewUrl: "/voices/avery.mp3" },
      { id: "voice_2", name: "Jordan", previewUrl: "/voices/jordan.mp3" },
    ]
  }

  async speak(text: string, _voiceId: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder()
    return encoder.encode(`AUDIO:${text}`).buffer
  }
}

export const voiceClient = new ElevenLabsClient()


