import useBasic from "../hooks/use-basic";

const BasicForm = (props) => {
  const {
    value: enteredFNameValue,
    isValid: fNameValueIsValid,
    hasError: fNameHasError,
    valueChangeHandler: fNameChange,
    inputBlurHandler: fNameInputBlur,
    reset: resetFNameInput,
  } = useBasic((value) => value.trim().length !== 0);

  const {
    value: enteredLNameValue,
    isValid: lNameValueIsValid,
    hasError: lNameHasError,
    valueChangeHandler: lNameChange,
    inputBlurHandler: lNameInputBlur,
    reset: resetLNameInput,
  } = useBasic((value) => value.trim().length !== 0);

  const {
    value: enteredEmailValue,
    isValid: emailValueIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChange,
    inputBlurHandler: emailInputBlur,
    reset: resetEmailInput,
  } = useBasic((value) => /[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+/g.test(value));

  let formIsValid = false;

  if (fNameValueIsValid && lNameValueIsValid && emailValueIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!fNameValueIsValid && !lNameValueIsValid && !emailValueIsValid) return;

    resetFNameInput();
    resetLNameInput();
    resetEmailInput();
  };

  const fNameInputClasses = fNameHasError
    ? "form-control invalid"
    : "form-control";
  const lNameInputClasses = lNameHasError
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = emailHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={fNameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={enteredFNameValue}
            onChange={fNameChange}
            onBlur={fNameInputBlur}
          />
          {fNameHasError && (
            <p className="error-text">First Name value is invalid.</p>
          )}
        </div>
        <div className={lNameInputClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={enteredLNameValue}
            onChange={lNameChange}
            onBlur={lNameInputBlur}
          />
          {lNameHasError && (
            <p className="error-text">Last Name value is invalid.</p>
          )}
        </div>
      </div>
      <div className="form-control">
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          value={enteredEmailValue}
          onChange={emailChange}
          onBlur={emailInputBlur}
        />
        {emailHasError && (
          <p className="error-text">Email value is invalid.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
