import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
    renderError({touched, error}){
        if (touched && error) {
            return <div className='ui error message'><div className='header'>{error}</div></div>
        }
    }

    // Destructure from onchange() and value to
    // {...formProps.input} to
    // { input } > {...input}

    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.touched && meta.error ? 'error' : ''}`
        return(
            <div className={className}>
                <label htmlFor="">{ label }</label>
                <input type="text" { ...input } autoComplete='off' />
                {this.renderError(meta)}
            </div>
        );
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render(){
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
                    <Field name='title' component={this.renderInput} label='Title' />
                    <Field name='description' component={this.renderInput} label='Description' />
                    <button className='ui button primary'>Submit</button>
                </form>
            </div>
        );
    }
}

const validate = ( formValues ) => {
    const errors = {};

    if (!formValues.title) {
        // only run if the user did not enter a title
        errors.title = 'Please enter a title.'
    }

    if (!formValues.description) {
        errors.description = 'Please enter a description.'
    }

    return errors;
}
export default reduxForm ({
    form: 'streamForm',
    validate,
}) ( StreamForm );