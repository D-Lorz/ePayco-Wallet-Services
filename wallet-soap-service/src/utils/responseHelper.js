const formatResponse = (cod_error, data, message_error, success) => {
    return {
        cod_error,
        data,
        message_error,
        success
    }
}

export default formatResponse
