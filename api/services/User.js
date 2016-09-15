var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    photo: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    forgotPassword: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    otp: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    accessToken: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    googleID: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    twitterID: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    facebookID: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('User', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {



};
module.exports = _.assign(module.exports, exports, model);