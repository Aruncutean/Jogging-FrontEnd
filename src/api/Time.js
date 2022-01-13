import Client from "./Client";


export function readAllTime() {
    return Client.get("/userTime").then(respuns => {
        console.log(respuns);
    })
};


export function readAllTimeFromUser(index) {
    return Client.get("/userTimeUser/" + index);
}


export function readTimeFromindex(id) {
    return Client.get("/user_time_show/"+id);
}


export function updateTimeFromIndex(index, time, distance, date) {
    return Client.put("userTime/" + index, {
        "userTime": {
            "time": time,
            "distance": distance,
            "date": date,
        }
    });
}

export function addTimeFrom(id, time, distance, date) {
    return Client.post("/userTime", {
        "userTime": {
            "user_id": id,
            "time": time,
            "distance": distance,
            "date": date
        }
    })
}
export function deleteTimeFromUser(index) {
    return Client.delete("/userTime/" + index);
}


export function getAverageTime(id) {
    return Client.get("/average_time/"+id)
}

export function getAverageDistance(id) {
    return Client.get("/average_distance/"+id)
}