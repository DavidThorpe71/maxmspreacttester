import React from 'react';
import Saves from './Saves';

class EditMaxfile extends React.Component {
    handleChange = (event) => {
        const updatedFile = { 
            ...this.props.details,
            [event.currentTarget.name]: event.currentTarget.value
        };
        this.props.updatePatch(this.props.index, updatedFile);
    }

    render () {
        const { name, desc, plugins, saves } = this.props.details;
        return (
            <form className="max-edit">
                <input name="name" onChange={this.handleChange} type="text" value={name} />            
                <input name="desc" onChange={this.handleChange} value={desc} />         
                <input name="plugins" onChange={this.handleChange} type="text" value={plugins} />
                <Saves details={saves} />
            </form>
        )
    }
}

export default EditMaxfile;