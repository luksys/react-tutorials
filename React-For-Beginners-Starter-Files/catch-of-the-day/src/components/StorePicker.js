import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {

	goToStore(event){
		event.preventDefault();
		console.log(this);

		const storeId = this.storeInput.value;
		console.log(storeId);
		this.context.router.transitionTo(`/store/${storeId}`);
	}

	//this.goToStore.bind(this) === (e) => this.goToStore(e)

	render(){
		return (
			<form action="" className="store-selector" onSubmit={(e) => this.goToStore(e)}>
				<h2>Please Enter A Store</h2>
				<input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input }}/>
				<button type="submit">Visit Store -></button>
			</form>
		)
	}
}

StorePicker.contextTypes = {
	router: React.PropTypes.object
}

export default StorePicker;