const formatResponse = (success, cod_error, message_error, data) => {
    return {
        success,
        cod_error,
        message_error,
        data
    };
};

export default formatResponse;