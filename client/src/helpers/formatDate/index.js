// Format : dd/mm/yyyy
export const getDate = (datetime) => {
    return datetime.split("T")[0].split("-").reverse().join("/")
}

// Format : HH:mm
export const getTime = (datetime) => {
    const [hour, minute] = datetime.split("T")[1].split(":");
    return `${hour}:${minute}`
}

export const getDay = (datetime) => {
    return datetime.split("T")[0].split("-")[2]
}

export const getMonth = (datetime) => {
    return datetime.split("T")[0].split("-")[1]
}

export const getYear = (datetime) => {
    return datetime.split("T")[0].split("-")[0]
}

export const getDateTime = (datetime) => {
    const dateOfPost = new Date(datetime);
    var minutes = Math.floor((new Date() - dateOfPost) / 60000);
    if (minutes === 0) minutes = 1;
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    var result = ""
    if(new Date().getYear() > dateOfPost.getYear() || new Date().getMonth() > dateOfPost.getMonth() || new Date().getDate() < dateOfPost.getDate() + 7){
        if(hours<=24){
            if(hours <= 0) result =  minutes + " phút trước"
            else result = hours + " giờ trước"
        } else result = days + " ngày trước"
    }
    else result = getDate(datetime)
    return result
}


 