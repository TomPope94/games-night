import React from 'react';
import { connect } from 'react-redux';

const styles = {
  alertsContainer: {
    position: 'absolute',
    top: 0,
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 9999,
  },
  alertBox: {
    padding: 10,
    opacity: 0.75,
  },
  positive: {
    background: 'green',
  },
  negative: {
    background: 'red',
  },
  neutral: {
    background: 'yellow',
  },
};

const Alert = ({ alerts }) => {
  return (
    <div style={styles.alertsContainer}>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <div
            key={alert.id}
            style={{ ...styles.alertBox, ...styles[alert.alertType] }}
          >
            {alert.msg}
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
