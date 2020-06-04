import React from 'react';
import { connect } from 'react-redux';
import { editStream, fetchStream } from '../../actions/index';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        // this.props.StreamEdit(formValues, this.props.match.params.id);
        this.props.editStream(this.props.stream.id, formValues);
    }

    render () {
        if (!this.props.stream) {
            return(
                <div>Loading...</div>
            );
        }

        return (
            <div className='ui container'>
                <h1 className='ui title'>Edit a Stream</h1>
                <StreamForm initialValues={{ title: this.props.stream.title, description: this.props.stream.description }} onSubmit={this.onSubmit} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.stream[ownProps.match.params.id]  }
}

export default connect(mapStateToProps, {editStream, fetchStream}) (StreamEdit);