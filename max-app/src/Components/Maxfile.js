import React from 'react';
import Saves from './Saves';

class Maxfile extends React.Component {
    render () {
        const { name, desc, plugins, saves } = this.props.details;
        return (
            <div className="maxfile">
                <h3 className="file-name">{name}</h3>
                <p>{desc}</p>
                <p className="plugins"><strong>VSTs:</strong> {plugins.fm8 && plugins.battery ? 'FM8, Battery' :  plugins.fm8 ? 'FM8' : plugins.battery ? 'Battery' : 'None'}</p>
                <h4 className="savesTitle">Previous versions:</h4>
                {Object.keys(saves).map(key => (
                    <Saves 
                        key={key}
                        details={saves[key]}
                    />
                ))}
            </div>
        )
    }
}

export default Maxfile;