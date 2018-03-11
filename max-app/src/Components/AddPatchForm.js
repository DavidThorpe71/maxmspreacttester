import React from 'react';

class AddPatchForm extends React.Component {
    nameRef = React.createRef();
    descRef = React.createRef();
    pluginsRef = React.createRef();
    savesRef = React.createRef();

    createPatch = (e) => {
        e.preventDefault();
        const patch = {
            name: this.nameRef.value.value,
            desc: this.descRef.value.value,
            plugins: this.pluginsRef.value.value,
            saves: this.savesRef.value.value,
        }
    }
    
    render() {
        return (
            <form className="patch-edit" onSubmit={this.createPatch}>
                <input name="name" ref={this.nameRef} type="text" placeholder="name" />            
                <input name="desc" ref={this.descRef} type="text" placeholder="desc" />            
                <input name="plugins" ref={this.pluginsRef} type="text" placeholder="plugins" />         
                <input name="saves" ref={this.savesRef} type="text" placeholder="saves" />
                <button type="submit">Add Patch</button>
            </form>
        )
    }
}

export default AddPatchForm;