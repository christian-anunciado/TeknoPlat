
import React from "react";
  
class Child extends React.Component {
    onTrigger = () => {
      this.props.parentCallback("Welcome to GFG");
    };
  
    render() {
      return (
        <div>
          <br></br> <br></br>
          <button onClick={this.onTrigger}>Click me</button>
        </div>
      );
    }
}
  
export default Child;