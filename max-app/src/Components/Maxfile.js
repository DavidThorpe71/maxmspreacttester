import React from 'react';

class Maxfile extends React.Component {
    render () {
        const { name, desc, plugins, saves } = this.props.details;
        return (
            <div className="maxfile">
                <h3 className="file-name">{name}</h3>
                <p>{desc}</p>
                <h4 className="plugins">VSTs: {plugins.fm8 && plugins.battery ? 'FM8, Battery' :  plugins.fm8 ? 'FM8' : plugins.battery ? 'Battery' : 'None'}</h4>
            </div>
        )
    }
}

export default Maxfile;