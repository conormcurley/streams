import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import {fetchStream, deleteStream} from '../../actions';
import {connect} from 'react-redux'

class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    getActions = () => {
        return (
            <div className='actions'>
                <button className='ui button negative' onClick={ this.onDelete }>Delete</button>
                <button className='ui button' onClick={() => history.push('/')}>Cancel</button>
            </div>
        );
    }

    onDelete = () => {
        this.props.deleteStream(this.props.match.params.id);
    }

    createDescription = () => {
        if (!this.props.stream) {
            return "Loading...";
        } else {
            return `Are you sure you want to delete the stream: "${this.props.stream.id }: ${this.props.stream.title} "`
        }
    }

    render () {
        return(
            <div>
                <Modal title={`Delete Stream ${this.props.match.params.id}?`} description={ this.createDescription() } buttonText='Delete' actions={ this.getActions() } onDismiss={() => history.push('/')} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.stream[ownProps.match.params.id]  }
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);