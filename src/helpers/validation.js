export const validate = {

    isChannelNameValid: function (value) {
        return !/^[A-Z0-9@+-._]{2,50}$/i.test(value) ? false : true
    },

}