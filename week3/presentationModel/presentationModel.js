
import { Observable } from "../observable/observable.js";
import { id }         from "../church/church.js";

export { Attribute,
         VALID, VALUE }

const VALUE = "value";
const VALID = "valid";


/**
 * The Attribute class has a list of Observable objects and validates them against a validator
 * @class that implements the Observable interface
 * @typedef {Object} Attribute
 * @param {*} value to be observed and validated
 * @returns {object} API of the Attribute class
 * @see Observable
 * @constructor
 */
const Attribute = value => {

    const observables = {};

    const hasObs = name => observables.hasOwnProperty(name);

    const getObs = (name, initValue = null) =>
        hasObs(name)
            ? observables[name]
            : observables[name] = Observable(initValue);

    getObs(VALUE, value); // initialize the value at least

    let   convert           = id ;
    const setConverter      = converter => {
        convert = converter;
        setConvertedValue(value);
    };
    const setConvertedValue = val => getObs(VALUE).setValue(convert(val));

    /**
     * Function uses a callback function to determinate if the val is valid
     * @param validate callback function used to evaluate an expression
     */
    const setValidator = validate => getObs(VALUE).onChange( val => getObs(VALID).setValue(validate(val)));

    return { getObs, hasObs, setValidator, setConverter, setConvertedValue }
};
