import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

export const Checkout = (props) => {
  const [formIsValid, setFormIsValid] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const isEmpty = (value) => {
    return value.trim() !== "";
  };
  const isFiveCahrs = (value) => {
    return value.trim().length === 5;
  };
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const validName = isEmpty(enteredName);
    const validStreet = isEmpty(enteredStreet);
    const validCity = isEmpty(enteredCity);
    const validPostalCode = isFiveCahrs(enteredPostalCode);

    const formValid = validName && validStreet && validCity && validPostalCode;

    setFormIsValid({
      name: isEmpty(enteredName),
      street: isEmpty(enteredStreet),
      city: isEmpty(enteredCity),
      postalCode: isFiveCahrs(enteredPostalCode),
    });

    console.log(formIsValid);
    if (!formValid) {
      return;
    }

    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  const classesControl = (value) =>
    value ? `${classes.control}` : `${classes.control} ${classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classesControl(formIsValid.name)}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        {!formIsValid.name && <p>Name is not valid !</p>}
      </div>
      <div className={classesControl(formIsValid.street)}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}></input>
        {!formIsValid.street && <p>street is not valid !</p>}
      </div>
      <div className={classesControl(formIsValid.postalCode)}>
        <label htmlFor="postal">postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef}></input>
        {!formIsValid.postalCode && <p>Postal code is not valid !</p>}
      </div>
      <div className={classesControl(formIsValid.city)}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}></input>
        {!formIsValid.city && <p>City is not valid !</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};
