import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ProgressBar, { IProgressBar } from './ProgressBar';
import { CreateOfferState } from '@lib/constants';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
} as Meta;

const Template: StoryFn<IProgressBar> = (args) => <ProgressBar {...args} />;

export const NoneState = Template.bind({});
NoneState.args = {
  currentStep: CreateOfferState.None,
};

export const FilledState = Template.bind({});
FilledState.args = {
  currentStep: CreateOfferState.Filled,
};

export const ApprovedState = Template.bind({});
ApprovedState.args = {
  currentStep: CreateOfferState.Approved,
};

export const CreatedState = Template.bind({});
CreatedState.args = {
  currentStep: CreateOfferState.Created,
};
