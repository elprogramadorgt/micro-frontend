const formatting_options_currency = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
};

const formatting_options_percentage = {
    style: "percent",
    maximumFractionDigits: 2,
};

const getCurrencyString = (value = 0) => {
    return new Intl.NumberFormat("en-US", formatting_options_currency)
        .format(value);
};

const getPercentageString = (value = 0) => {
    return new Intl.NumberFormat("en-US", formatting_options_percentage)
        .format(value / 100);
};

const getYesOrNoString = (value = false) => {
    return value ? "Yes" : "No";
};

const getIntegerString = (value = 0) => {
    return new Intl.NumberFormat("en-US").format(value);
};

export {
    getCurrencyString,
    getPercentageString,
    getYesOrNoString,
    getIntegerString,
};
