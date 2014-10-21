var mongoose = require('mongoose');

mongoose.connect('mongodb://' + process.env.IP + '/test');

var studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    dob: Date
});
var Student = mongoose.model('Students', studentSchema);

exports.getAllStudents = function(callback) {
    Student.find(callback);
};
exports.getStudentById = function(studentId, callback) {
    Student.where({
        _id: studentId
    }).findOne(callback);
};
exports.addStudent = function(firstName, lastName, dob, callback) {
    var student = new Student({
        firstName: firstName,
        lastName: lastName,
        dob: dob
    });
    student.save(callback);
};
exports.updateStudent = function(studentId, firstName, lastName, dob, callback) {
    Student.findOneAndUpdate({
        _id: studentId
    }, {
        firstName: firstName,
        lastName: lastName,
        dob: dob
    }, callback);
};
exports.deleteStudent = function(studentId, callback) {
    Student.where({
        _id: studentId
    }).findOneAndRemove(callback);
};