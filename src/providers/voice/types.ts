export type Voice = {
  id: string
  name: string
  previewUrl?: string
}

export interface IVoiceProvider {
  listVoices(): Promise<Voice[]>
  speak(text: string, voiceId: string): Promise<ArrayBuffer>
}


