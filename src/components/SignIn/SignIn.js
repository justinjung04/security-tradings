import React from 'react';

import signIn from '../../firebase/signIn';

import './SignIn.scss';

export default class SignIn extends React.PureComponent {
	render() {
		return (
			<div className='SignIn'>
        <button onClick={signIn}>Sign In</button>
      </div>
		);
	}
}