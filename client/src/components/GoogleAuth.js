import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component {

    componentDidMount () {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '985211085857-iqodma99fkmld2lo5idaf81c4ed1u2t9.apps.googleusercontent.com',
                scope: 'email',
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChanged(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen( this.onAuthChanged );
            })
        });
    }

    onAuthChanged = isSignedIn => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuth () {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return(
                <button onClick={ this.onSignOutClick } className='ui white google button'>
                    <i className='google icon'></i>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={ this.onSignInClick } className='ui blue google button'>
                    <i className='google icon'></i>
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return(
            <div className='item'>{ this.renderAuth() }</div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }; 
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);