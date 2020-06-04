import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
    componentDidMount () {
        this.props.fetchStreams();
    }

    renderCreateButton () {
        if (this.props.currentUid) {
            return(
                <Link to='/streams/new'>
                    <button className='ui button teal' style={{marginTop: 30, marginBottom: 20}}>Create Stream</button>
                </Link>
            );
        }
    }

    renderAdmin(stream) {
        if (stream.uid === this.props.currentUid) {
            return (
                <div className='right floated content'>
                    <Link to={`/streams/edit/${stream.id}`} className='ui button blue'>Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className='ui button red outline'>Delete</Link>
                </div>
            );
        }
    }

    renderList () {
        return this.props.streams.reverse().map(stream => {
            return(
                <div className='item' key={ stream.id }>
                    {this.renderAdmin(stream)}
                    <i className='large middle aligned icon camera'></i>
                    <div className='content'>
                    <div style={{float:'right', marginTop: 5}} className='ui mini button blue'><strong>ID: {stream.id}</strong></div>
                        <Link to={`/streams/show/${stream.id}`}> <h4 className='ui teal header'>{stream.title}</h4> </Link>
                        <div className='description'>{stream.description}</div>   
                    </div>
                    
                </div>
            );
        })
    }
    
    render() {
        return(
            <div className='ui vertical very padded segment'>
                <div className='ui container'>
                    <h1>Streams </h1>
                    <div className='ui divided list very relaxed'>{this.renderList()}</div>
                    <div className='floated right content'>
                        {this.renderCreateButton()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        streams: Object.values(state.stream),
        currentUid: state.auth.uid,
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);