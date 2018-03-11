import React from 'react';

class LoadData extends React.Component {
    render () {
        return (
            <div className="LoadData">
                <button onClick={this.props.loadSampleData}>
                    Load sample maxfiles
                </button>
            </div>
        )
    }
}

export default LoadData;