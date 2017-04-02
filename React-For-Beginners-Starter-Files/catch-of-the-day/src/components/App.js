import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import base from '../base';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
	constructor(){
		super();

		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);

		// Initial State
		this.state = {
			fishes: {},
			order: {}
		}
	}

	componentWillMount() {
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`
		, {
			context: this,
			state: 'fishes'
		});

		// check if there is any order in localStorage
		const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

		if(localStorageRef) {
			// update our App component's order state
			this.setState({
				order: JSON.parse(localStorageRef)
			})
		}
	}

	componentWillUnmount(){
		base.removeBinding(this.ref);
	}

	componentWillUpdate(nexProps, nexState) {
			localStorage.setItem(`order-${this.props.params.storeId}`,
			JSON.stringify(nexState.order)
		);
	}

	addFish(fish){
		// Update our state
		const fishes = {...this.state.fishes};
		// can do this, but not the best way => this.state.fishes.fish1 = fish;

		// Add in our new fish
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;
		// Set state
		this.setState({ fishes });
	}

	loadSamples(){
		this.setState({
			fishes: sampleFishes
		});
	}

	addToOrder(key){
		// take a copy of our state
		const order = {...this.state.order};
		// update or add the new number of fish ordered
		order[key] = order[key] + 1 || 1;
		// update our state
		this.setState({ order });
	}

	render(){
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
					<ul className="list-of-fishes">
						{
							Object
								.keys(this.state.fishes)
								.map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
						}
					</ul>
				</div>
				<Order 
					fishes={this.state.fishes}
					order={this.state.order}
					params={this.props.params}
				/>
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
			</div>
		)
	}
}

export default App;