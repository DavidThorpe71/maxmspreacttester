import React from 'react';
import moment from 'moment';

class AddPatchForm extends React.Component {
    nameRef = React.createRef();
    descRef = React.createRef();
    fm8Ref = React.createRef();
    batteryRef = React.createRef();
    savesRef = React.createRef();

    createPatch = (e) => {
        e.preventDefault();
        
        const patch = {
            created: moment().format('MMMM Do YYYY, HH:mm:ss'),
            name: this.nameRef.value.value,
            desc: this.descRef.value.value,
            plugins: {
                fm8: this.fm8Ref.value.checked,
                battery: this.batteryRef.value.checked,
            },
            saves: {
                save1: {
                    date: moment().format('MMMM Do YYYY, HH:mm:ss'),
                    text: this.savesRef.value.value
                }
            }
        }
        console.log(this.fm8Ref);
        this.props.addPatch(patch);
    }
    
    render() {
        return (
            <form className="patch-edit" onSubmit={this.createPatch}>
                <input name="name" ref={this.nameRef} type="text" placeholder="Name" />            
                <textarea name="desc" ref={this.descRef} placeholder="Desc"></textarea>           
                <div className="plugins">
                    <input id="fm8tick" ref={this.fm8Ref} name="fm8" type="checkbox" />
                    <label for="fm8tick">FM8</label>
                    <input id="batterytick" ref={this.batteryRef} name="battery" type="checkbox" />
                    <label for="batterytick">Battery</label>
                </div>
                <input name="saves" ref={this.savesRef} type="text" placeholder="Saves" />
                <button type="submit">Add Patch</button>
            </form>
        )
    }
}

export default AddPatchForm;