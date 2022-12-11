import React from 'react'
import './PillTab.scss'
function PillTab() {
    return (
        <div className="pill-container">
            <div className="tabs">
                <input type="radio" id="radio-1" name="tabs" checked />
                <label className="tab" for="radio-1">Home</label>
                <input type="radio" id="radio-2" name="tabs" />
                <label className="tab" for="radio-2">About</label>
                <input type="radio" id="radio-3" name="tabs" />
                <label className="tab" for="radio-3"> Contact Us</label>
                <span className="glider"></span>
            </div>
        </div>
    )
}

export default PillTab
