import React, { PureComponent } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { StepContent } from '@material-ui/core';

const steps = ['User Details', 'Monthly Income', 'Monthly Bill Reminders'];

class CustomStepper extends PureComponent {
    render() {
        return (
            <Stepper nonLinear 
            activeStep={this.props.activeStep} 
            orientation="vertical" 
            style={{ backgroundColor: 'inherit' }}>
                {this.props.stepContent.map((content, index) => {
                    return (
                        <Step key={index}>
                            <StepLabel>{steps[index]}</StepLabel>
                            <StepContent>
                                {content}
                            </StepContent>
                        </Step>
                    );
                })}
            </Stepper>
        )
    }
}

export default CustomStepper;