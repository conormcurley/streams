import React from 'react';
import flv from 'flv.js';
import {connect} from 'react-redux';
import {fetchStream} from '../../actions';

class StreamShow extends React.Component{
    constructor(props) {
        super(props);

        this.videoRef = React.createRef()
    }

    componentDidMount() {
        const {id} = this.props.match.params;

        this.props.fetchStream(id);
        this.buildPlayer(id);
    }

    componentDidUpdate() {
        this.buildPlayer(this.props.match.params.id);
    }

    buildPlayer = (id) => {
        if (this.player || !this.props.stream) {
            return;
        }

        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });

        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    renderTitle = () => {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        const {title, description} = this.props.stream;
        
        return (
            <div>
                <video ref={this.videoRef} style={{width:'80%'}} controls></video>
                <h1>{title}</h1>
                <div className='content'>
                    <div className='description'>{description}</div>
                </div>
            </div>
        )
    }

    render () {
        return(
            <div className='ui container'>
                <div className='ui very padded segment basic'>
                    {this.renderTitle()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.stream[ownProps.match.params.id],
    };
}

export default connect(mapStateToProps, {fetchStream})(StreamShow);