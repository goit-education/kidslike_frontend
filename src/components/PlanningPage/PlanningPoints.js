import React from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../../pages/PlanningPage/Planning.module.css';
import getWeekPlanPoints from '../../redux/tasks/taskSelector';
import { getIsShowLengRu } from '../../redux/global/globalSelectors';

const PlanningPoints = ({ countPoints }) => {
  const IsShowLengRu = useSelector(getIsShowLengRu);

  if (!IsShowLengRu) {
    return (
      <p className={styles.pointsText}>
        <span className={styles.hiddenSpan}>Визначено завдань на</span>
        {/* <span className={styles.hiddenSpan}>Определены задач на</span> */}
        <span className={styles.pointsAmount}>{countPoints}</span>
        бали
        {/* баллы */}
      </p>
    );
  }

  return (
    <p className={styles.pointsText}>
      {/* <span className={styles.hiddenSpan}>Визначено завдань на</span> */}
      <span className={styles.hiddenSpan}>Определены задач на</span>
      <span className={styles.pointsAmount}>{countPoints}</span>
      {/* бали */}
      баллы
    </p>
  );
};

const MSTP = state => ({
  countPoints: getWeekPlanPoints(state),
});

PlanningPoints.propTypes = {
  countPoints: PropTypes.number.isRequired,
};

export default connect(MSTP)(PlanningPoints);
