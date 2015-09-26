'use strict';

import React from 'react';
import Tappable from 'react-tappable';

class LabelRating extends React.Component {

	constructor(props){
    super(props);

    this.state = {
      currentValue:props.value
    };
  }

	renderStars(val){
		//max 5 stars
		let max = 5;

		if(val > max){
			val = max;
		}

		let n = max, ratings = [], v = val-1;
		while(n--){
			let star = n <= v ? 'ion-ios7-star' : 'ion-ios7-star-outline';
			ratings.unshift(
				this.props.readOnly ? <span className={star} style={{margin:3}} key={`star${n}`}/> :
				<Tappable
					onTap={this.onStarTap.bind(this, n+1)}
					className={star}
					style={{margin:3}}
					component="span"
					key={`star${n}`}/>
			);
		}
		return ratings;
	}

	onStarTap(n){
		this.setState({currentValue:n});
		!!this.props.starTapFunc && this.props.starTapFunc(n);
	}

	render() {
		return (
			<div>
				<div className="list-item field-item align-top">
					<label className="item-inner">
						<div className="field-label">
							{this.props.label}
						</div>
						<div className="field-control">
							{this.renderStars(this.state.currentValue)}
						</div>
					</label>
				</div>
			</div>
		)
	}
}

export default LabelRating;
