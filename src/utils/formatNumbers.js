// Code took off stackoverflow because who the fuck knew about toPrecision:)

export function formatNumber(value) {
    let newValue = value;
    const suffixes = ["", " K", " M", " B", " T"];
    let suffixNum = 0;
    while (newValue >= 1000) {
        newValue /= 1000;
        suffixNum++;
    }

    newValue = newValue.toFixed(2);

    newValue += suffixes[suffixNum];
    return newValue;
}