import React, { useState } from 'react';
import { connect } from 'react-redux';

import { setAlert } from 'actions/alert';
import { sendNames } from 'actions/guessPeople';
import GameButton from 'components/global/GameButton';

const styles = {
  submitContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    borderRadius: 10,
    background: '#fff',
    boxShadow: '0 3px 5px rgba(1,1,1,0.5)',
  },
  textInput: {
    fontSize: '1.5rem',
    marginBottom: 15,
  },
};

const PeopleSetup = ({ session, server, guessPeople, setAlert, sendNames }) => {
  const [formData, setFormData] = useState({
    nameOne: '',
    nameTwo: '',
    nameThree: '',
    nameFour: '',
    nameFive: '',
  });

  const checkInput = (dataObj) => {
    const values = Object.values(dataObj);
    const noVal = values.filter((val) => val.length < 1);
    // debugger;

    if (noVal.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const check = checkInput(formData);
    if (check) {
      await sendNames(server.wsConnection, session.sessionId, formData);
    } else {
      await setAlert('Need to enter 5 names!', 'neutral');
    }
  };

  return (
    <div>
      {guessPeople.submittedPeople ? (
        <h4>Waiting for everyone to submit...</h4>
      ) : (
        <div style={styles.submitContainer}>
          <div style={styles.inputContainer}>
            <input
              style={styles.textInput}
              type="text"
              value={formData.nameOne}
              name="nameOne"
              onChange={(e) => handleChange(e)}
            />
            <input
              style={styles.textInput}
              type="text"
              value={formData.nameTwo}
              name="nameTwo"
              onChange={(e) => handleChange(e)}
            />
            <input
              style={styles.textInput}
              type="text"
              value={formData.nameThree}
              name="nameThree"
              onChange={(e) => handleChange(e)}
            />
            <input
              style={styles.textInput}
              type="text"
              value={formData.nameFour}
              name="nameFour"
              onChange={(e) => handleChange(e)}
            />
            <input
              style={styles.textInput}
              type="text"
              value={formData.nameFive}
              name="nameFive"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <GameButton color="#d66e31" onMouseDown={(e) => handleSubmit(e)}>
            <h3>Submit.</h3>
          </GameButton>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  session: state.session,
  server: state.server,
  guessPeople: state.guessPeople,
});

export default connect(mapStateToProps, { setAlert, sendNames })(PeopleSetup);
