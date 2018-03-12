import React from 'react';

class Saves extends React.Component {
    render() {
        const { text, date } = this.props.details;
        return (
            <div className="saves">
                <p>{date} <span>{text}</span></p>
            </div>
        )
    }
}

export default Saves;