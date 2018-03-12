import React from 'react';

class Save extends React.Component {
    render() {
        const { text, date } = this.props.details;
        return (
            <div className="save">
                <p>{date} <span>{text}</span></p>
            </div>
        )
    }
}

export default Save;