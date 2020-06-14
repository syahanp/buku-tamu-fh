import React, { Component } from 'react';

class Input extends Component {
    render() { 
        return (
            <div className={'input-wrapper ' + this.props.className}>
                <label>
                    <input
                        onChange={this.props.onChange}
                        onBlur={this.props.onBlur}
                        type={this.props.type} 
                        name={this.props.name}
                        placeholder="&nbsp;"
                    />
                    <div>
                        <span className="placeholder">{this.props.placeholder}</span>
                        <span className="borders"></span>
                    </div>
                </label>
                <div className="note">{this.props.note}</div>
            </div>
            
        );
    }
}
 
export default Input;
