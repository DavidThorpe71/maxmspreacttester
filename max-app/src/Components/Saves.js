import React from 'react';
import Save from './Save';

class Saves extends React.Component {
    render() {
        const saves = this.props.details;
        return (
            <div className="version-control">
                <h4 className="savesTitle">Previous versions:</h4>
                <button className="addSave">Add version</button>
                {Object.keys(saves).map(key => (
                    <Save 
                        key={key}
                        details={saves[key]}
                    />
                ))}
            </div>
        )
    };
};

export default Saves;