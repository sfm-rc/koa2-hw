export const pagination = (limit, pageIndex, count) => {
    return {
        pagination: {
            pageCount: Math.ceil(count/limit),
            pageIndex,
            limit
        }
    }
}

export const getLinuxTimeStamp = () => {
    return (new Date).getTime()/1000
}