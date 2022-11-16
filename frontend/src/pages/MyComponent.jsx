import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyComponent extends Component {
    // state = {
    //     num: 1,
    // }

    // constructor(props) {
    //     super(props)
    //     this.state.num = props.num
    // }

    // componentDidMount() {
    //     this.props.num = 3
    // }

    render() {
        var { num } = this.props
        num += 5
        return (
            <div>
                <h1>Test: {num}</h1>
            </div>
        );
    }
}

MyComponent.propTypes = {

};

export default MyComponent;