import moment from "moment"

export const getDaysInMonth = monthMoment => {
    const monthCopy = monthMoment.clone()
    monthCopy.startOf('month')

    let days = [];

    while (monthCopy.month() === monthMoment.month()) {
        days.push(monthCopy.clone())
        monthCopy.add(1, 'days')
    }
    return days
}


