import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';
function StatisticsComp() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const clickHandler = e => {
    switch (e.target.name) {
      case 'good': {
        setGood(prevS => prevS + 1);
        break;
      }
      case 'neutral': {
        setNeutral(prevS => prevS + 1);
        break;
      }
      case 'bad': {
        setBad(prevS => prevS + 1);
        break;
      }
      default:
        throw new Error('No such element');
    }
  };

  const countTotalFeedback = () => good + neutral + bad;

  const countPositiveFeedbackPercentage = () =>
    Math.round((good / countTotalFeedback()) * 100);

  const totalFeedback = countTotalFeedback();
  const totalFeedbackPrs = countPositiveFeedbackPercentage();
  return (
    <>
      <Section title={'Please live a comment'}>
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={clickHandler}
        />
      </Section>
      <Section title="Statistics">
        {totalFeedback ? (
          <Statistics
            options={{ good, neutral, bad }}
            total={totalFeedback}
            positivePercentage={totalFeedbackPrs}
          />
        ) : (
          <Notification message="No feedback given" />
        )}
      </Section>
    </>
  );
}

StatisticsComp.propTypes = {
  stats: PropTypes.shape({
    good: PropTypes.number.isRequired,
    neutral: PropTypes.number.isRequired,
    bad: PropTypes.number.isRequired,
  }),
};
export default StatisticsComp;
