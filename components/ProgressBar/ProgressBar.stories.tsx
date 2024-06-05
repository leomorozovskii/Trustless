import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ProgressBar, { IProgressBar } from './ProgressBar';
import { OfferProgress } from '@lib/constants';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
} as Meta;

const Template: StoryFn<IProgressBar> = (args) => <ProgressBar {...args} />;

export const NoneState = Template.bind({});
NoneState.args = {
  currentStep: OfferProgress.None,
};

export const FilledState = Template.bind({});
FilledState.args = {
  currentStep: OfferProgress.Filled,
};

export const ApprovedState = Template.bind({});
ApprovedState.args = {
  currentStep: OfferProgress.Approved,
};

export const CreatedState = Template.bind({});
CreatedState.args = {
  currentStep: OfferProgress.Created,
};
