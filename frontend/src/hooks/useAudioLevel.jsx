import {
  useHMSStore,
  useHMSActions,
  selectLocalPeer,
  selectPeerAudioByID,
  selectSpeakers,
  selectDominantSpeaker,
  selectIsConnectedToRoom,
} from "@100mslive/react-sdk";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export const useAudioLevel = () => {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const dominantSpeaker = useHMSStore(selectDominantSpeaker);
  const currSpeaker = useRef([]);

  useEffect(() => {
    console.log(currSpeaker.current[0]);
    if (isConnected) {
      if (
        dominantSpeaker &&
        !dominantSpeaker.isLocal &&
        dominantSpeaker.roleName === "participant"
      ) {
        currSpeaker.current[0] = toast.info(
          `${dominantSpeaker.name} is currently talking`,
          {
            autoClose: false,
            icon: "🎙️",
            toastId: dominantSpeaker.id,
          }
        );
      }
      if (dominantSpeaker === null) {
        toast.update(currSpeaker.current[0], {
          autoClose: 1000,
        });
      }
    }
  }, [isConnected, dominantSpeaker]);
};
