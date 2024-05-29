import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ProgressOfferBar, { IProgressOfferBar } from './ProgressOfferBar';

export default {
  title: 'Components/ProgressOfferBar',
  component: ProgressOfferBar,
} as Meta;

const Template: StoryFn<IProgressOfferBar> = (args) => (
  <ProgressOfferBar {...args} />
);

export const InitialStep = Template.bind({});
InitialStep.args = {
  currentStep: 1,
  steps: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
};

export const SecondStep = Template.bind({});
SecondStep.args = {
  currentStep: 2,
  steps: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
};

export const ThirdStep = Template.bind({});
ThirdStep.args = {
  currentStep: 3,
  steps: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
};

export const FinalStep = Template.bind({});
FinalStep.args = {
  currentStep: 4,
  steps: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
};

export const Completed = Template.bind({});
Completed.args = {
  currentStep: 5,
  steps: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
};
