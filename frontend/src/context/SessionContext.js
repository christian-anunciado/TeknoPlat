import React, { createContext, useReducer } from 'react'

const SessionContext = createContext()
export default SessionContext
export function SessionContextProvider({ children }) {

    const sessionReducer = (state, action) => {
        switch (action.type) {
            case "UPDATE_SESSION_STATUS":
                state = {
                    ...state,
                    role: action.payload.role,
                    peer: action.payload.peer,
                    loading: action.payload.loading,
                    isConnected: action.payload.isConnected,
                    hostJoined: action.payload.hostJoined
                }

                return state

            case "UPDATE_SESSION":
                return {
                    ...state,
                    session: action.payload.session,
                    hostName: action.payload.hostName,
                    isConnected: action.payload.isConnected
                }

            case "UPDATE_HOSTJOINED":
                return {
                    ...state,
                    hostJoined: action.payload.hostJoined
                }


            case "UPDATE_ROLE":
                return {
                    ...state,
                    role: action.payload.role,
                }

            case "UPDATE_RATING":
                return {
                    ...state,
                    isRatingOpen: action.payload.isRatingOpen,
                }

            case "LEAVE":
                return {
                    session: null,
                    role: null,
                    peer: null,
                    loading: true,
                    isConnected: false,
                    hostJoined: false,
                    hostName: null,
                    isRatingOpen: false
                }

            default:
                return state
        }
    }

    const INITIAL_STATE = {
        session: null,
        isConnected: false,
        role: null,
        peer: null,
        participants: 0,
        loading: true,
        hostJoined: false,
        hostName: null,
        isRatingOpen: false,
    }

    const [state, dispatch] = useReducer(sessionReducer, INITIAL_STATE)


    return (
        <SessionContext.Provider value={{ session: state, dispatch }}>
            {children}
        </SessionContext.Provider>
    )

}
