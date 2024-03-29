import { createMicrophoneAndCameraTracks, createClient, createScreenVideoTrack } from 'agora-rtc-react'

const token = "007eJxTYODrCcqK/LMvM/693tPshcJ9Avtt+y4dnJokckNgafjdXXsVGJLMzMxSzUwtU5PTjE2Mkg2SEo1SjM2TzBPNLFINDE0MMkJykhsCGRkEGEpZGBkgEMRnYchNzMxjYAAAWVQesg=="
const APP_ID = "b666e659ecf342c0ba2d37b7a68e0140"

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

export let uid = sessionStorage.getItem('uid')

if (!uid) {
    uid = String(Math.floor(Math.random() * 10_000))
    sessionStorage.setItem('uid', uid)
}



export let channelName = urlParams.get('room')

if (!channelName) {
    channelName = 'main'
}
export const config = { mode: "rtc", codec: "vp8", appId: APP_ID, token }
export const useClient = createClient(config)
export const createScreenShare = createScreenVideoTrack()
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks({}, {
    encoderConfig: {
        width: { min: 640, ideal: 1920, max: 1920 },
        height: { min: 480, ideal: 1080, max: 1080 }
    },
    optimizationMode: 'motion'
})
