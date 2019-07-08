

class response {

    /**
     * 请求成功
     * @param {*} data 
     * @param {*} message 
     * @param {*} code 
     */
    static success(data, message = '成功', code = '0000') {
        return {
            respCode: code,
            respData: data,
            respDesc: message
        }
    }


    /**
     * 请求失败
     * @param {*} data 
     * @param {*} message 
     * @param {*} code 
     */
    static fail(data, message = '失败', code = '0001') {
        return {
            respCode: code,
            respData: data,
            respDesc: message
        }
    }
}



module.exports = response