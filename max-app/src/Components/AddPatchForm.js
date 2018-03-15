import React from 'react';
import moment from 'moment';

class AddPatchForm extends React.Component {
    nameRef = React.createRef();
    descRef = React.createRef();
    pluginsRef = React.createRef();
    batteryRef = React.createRef();
    savesRef = React.createRef();

    createPatch = (e) => {
        e.preventDefault();
        
        const patch = {
            created: moment().format('MMMM Do YYYY, HH:mm:ss'),
            name: this.nameRef.value.value,
            desc: this.descRef.value.value,
            plugins: this.pluginsRef.value.value,
            saves: {
                save1: {
                    date: moment().format('MMMM Do YYYY, HH:mm:ss'),
                    text: this.savesRef.value.value
                }
            }
        }
        this.props.addPatch(patch);
        e.currentTarget.reset();
        this.props.showForm();
    }
    
    render() {
        return (
            <form className="patch-edit" onSubmit={this.createPatch}>
                <input name="name" ref={this.nameRef} type="text" placeholder="Patch name" />            
                <input name="desc" ref={this.descRef} placeholder="Description" />          
                <input name="plugins" ref={this.pluginsRef} type="text" placeholder="Plugins used" />            
                <input name="saves" ref={this.savesRef} type="text" placeholder="Saves" />
                <button type="submit">Save Patch</button>
            </form>
        )
    }
}

export default AddPatchForm;