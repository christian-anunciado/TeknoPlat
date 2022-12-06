import { useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import axios from "axios";
import { useLocation } from "react-router-dom";

function JoinForm({ role, setRole }) {
    const hmsActions = useHMSActions();
    const [inputValues, setInputValues] = useState({
        name: "",
        token: ""
    });

    const { state } = useLocation()
    const { sessionID } = state || {}

    const handleInputChange = (e) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const req = await axios.post('http://localhost:8000/api/generateAppToken', {
                "room_id": sessionID,
                "role": role,
                "user_id": inputValues.name
            })
            if (req) {
                await hmsActions.join({
                    userName: inputValues.name,
                    authToken: req.data
                });
            }
        } catch (err) {
            alert(err)
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Join Room</h2>
            <div className="input-container">
                <input
                    required
                    value={inputValues.name}
                    onChange={handleInputChange}
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                />
            </div>

            <div className="input-container">
                <label for="roles">Choose a role: </label>
                <select name="roles" id="roles" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="creator">Creator</option>
                    <option value="participant">Participant</option>
                </select>
            </div>
            <button className="btn-primary">Join</button>
        </form>
    );
}

export default JoinForm;
