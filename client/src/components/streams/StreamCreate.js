import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions/index';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {

    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }

    render(){
        return (
            <div className='ui container'>
                <h1 className='ui title'>Create a Stream</h1>
                <StreamForm onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

export default connect(null, {createStream})(StreamCreate);