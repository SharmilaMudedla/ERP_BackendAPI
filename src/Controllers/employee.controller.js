import asyncHandler from "../Utils/asyncHandler.js";
import { handleError, handleSuccess } from "../Utils/responseHandler.js";
import Employee from "../Models/employee.model.js";
import Department from "../Models/department.model.js";
import { validationResult } from "express-validator";
import parseValidations from "../Utils/parseValidations.js";
import mongoose from "mongoose";
import moment from "moment";
import { EmployeeBirthDayEmailTemplate } from "../Utils/birthdayTemplate.js";
import { sendEmail } from "../Utils/mailClient.js";
// ====================== create employee ========================

const addEmployee = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      "Validation Error",
      400,
      parseValidations(errors.array())
    );
  }
  const existingEmployee = await Employee.findOne({ email: req.body.email });
  if (existingEmployee) {
    return handleError(res, "Employee already exists", 409, null);
  }
  const employee = await Employee.create(req.body);

  handleSuccess(res, "Employee added successfully", 201, employee);
});

// ====================== get all employees =======================

const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find().populate([
    {
      path: "departmentId",
      select: "name managerId",
    },
  ]);
  handleSuccess(res, "Employees fetched successfully", 200, employees);
});

// ====================== get single employee =======================

const getSingleEmployee = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError(res, "Invalid employee ID", 400, null);
  }
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    return handleError(res, "Employee not found", 404, null);
  }
  handleSuccess(res, "Employee fetched successfully", 200, employee);
});
// ====================== get single employee Profiledetails =======================
const getEmployeeProfileDetails = asyncHandler(async (req, res) => {
  const userInfo = req.user;
  if (!userInfo) {
    return handleError(res, "Invalid or expired token", 401, null);
  }
  const employee = await Employee.findById(userInfo.id).select("-password");
  if (!employee) {
    return handleError(res, "Employee not found", 404, null);
  }

  handleSuccess(res, "Employee profile fetched successfully", 200, employee);
});

// ====================== update employee =======================
const updateEmployee = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      "Validation Error",
      400,
      parseValidations(errors.array())
    );
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError(res, "Invalid employee ID", 400, null);
  }
  const singleEmployee = await Employee.findById(req.params.id);
  if (!singleEmployee) {
    return handleError(res, "Employee not found", 404, null);
  }
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!employee) {
    return handleError(res, "Employee not found", 400, null);
  }
  handleSuccess(res, "Employee updated successfully", 200, employee);
});

// ======================== update employee status ===========================
const updateEmployeeStatus = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError(res, "Invalid employee ID", 400, null);
  }
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    return handleError(res, "Employee not found", 404, null);
  }
  const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params.id,
    { isActive: !employee.isActive },
    { new: true }
  );
  handleSuccess(
    res,
    "Employee status updated successfully",
    200,
    updatedEmployee
  );
});

// ============================== Total Employees count =======================================
const totalEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.countDocuments();
  return handleSuccess(res, "Count Fetched Successfully", 200, employees);
});
// ======================== get employee birthdays ===================================
// const getEmployeeBirthdays = asyncHandler(async (req, res) => {
//   const employees = await Employee.find();

//   const today = moment().startOf("day");
//   const startOfWeek = moment().startOf("week");
//   const endOfWeek = moment().endOf("week");
//   const thisMonth = today.month();

//   const birthdays = {
//     todaysBirthdays: [],
//     thisWeekBirthdays: [],
//     thisMonthBirthdays: [],
//   };

//   employees.forEach((employee) => {
//     const dobString = employee?.dateOfBirth;
//     if (!dobString) return;

//     const dobParts = String(dobString).split("-");
//     if (dobParts.length < 2) return;

//     const [dayStr, monthStr] = dobParts;
//     const day = parseInt(dayStr, 10);
//     const month = parseInt(monthStr, 10);

//     if (!day || !month) return;

//     const dobThisYear = moment({ year: today.year(), month: month - 1, day });

//     const minimalInfo = {
//       firstName: employee.firstName,
//       lastName: employee.lastName,
//       dateOfBirth: employee.dateOfBirth,
//       mobileNumber: employee.phone,
//     };

//     if (dobThisYear.isSame(today, "day")) {
//       birthdays.todaysBirthdays.push(minimalInfo);
//     }
//     if (dobThisYear.isBetween(startOfWeek, endOfWeek, "day", "[]")) {
//       birthdays.thisWeekBirthdays.push(minimalInfo);
//     }
//     if (month - 1 === thisMonth) {
//       birthdays.thisMonthBirthdays.push(minimalInfo);
//     }
//   });

//   const sortByDay = (a, b) => {
//     const dayA = parseInt(a.dateOfBirth.split("-")[0], 10);
//     const dayB = parseInt(b.dateOfBirth.split("-")[0], 10);
//     return dayA - dayB;
//   };

//   birthdays.thisWeekBirthdays.sort(sortByDay);
//   birthdays.thisMonthBirthdays.sort(sortByDay);
//   birthdays.todaysBirthdays.sort(sortByDay);

//   handleSuccess(res, "Birthdays Fetched Successfully", 200, birthdays);
// });
const getEmployeeBirthdays = asyncHandler(async (req, res) => {
  const employees = await Employee.find();
  const today = moment().startOf("day");
  const tomorrow = moment().add(1, "day").startOf("day");
  const birthdays = {
    tomorrowsBirthdays: [],
  };

  employees.forEach((employee) => {
    if (!employee?.dateOfBirth) return;
    const dob = moment(employee.dateOfBirth, "YYYY-MM-DD");
    if (!dob.isValid()) return;
    const dobThisYear = moment({
      year: today.year(),
      month: dob.month(),
      day: dob.date(),
    });

    const minimalInfo = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      dateOfBirth: employee.dateOfBirth,
      mobileNumber: employee.phone,
    };
    if (dobThisYear.isSame(tomorrow, "day")) {
      birthdays.tomorrowsBirthdays.push(minimalInfo);
    }
  });

  handleSuccess(
    res,
    "Tomorrow's Birthdays Fetched Successfully",
    200,
    birthdays
  );
});

// ======================== send Birthday Remainders to Admin =======================

const sendBirthdayRemainderstoAdmin = asyncHandler(async (req, res) => {
  const employees = await Employee.find().lean();
  const tomorrow = moment().add(1, "day");

  const birthDayList = employees.filter((employee) => {
    if (!employee.dateOfBirth) return false;
    const dob = moment(employee.dateOfBirth, ["DD-MM-YYYY", "YYYY-MM-DD"]);
    if (!dob.isValid()) return false;
    return dob.date() === tomorrow.date() && dob.month() === tomorrow.month();
  });

  if (!birthDayList.length) {
    if (res) {
      return handleSuccess(res, "No birthdays found for tomorrow", 200, []);
    } else {
      console.log("No birthdays found for tomorrow");
      return [];
    }
  }

  await sendEmail({
    to: "sharmilamudedla05@gmail.com",
    cc: ["kamadibhavani16@gmail.com"],
    subject: "REMAINDER OF BIRTHDAYS",
    html: EmployeeBirthDayEmailTemplate(birthDayList),
    from: "kamadibhavani16@gmail.com",
  });

  console.log("Birthday reminder email sent successfully!");

  if (res) {
    return handleSuccess(
      res,
      "Birthdays fetched successfully",
      200,
      birthDayList
    );
  } else {
    return birthDayList;
  }
});
// ======================== send Birthday Remainders to Admin =======================
const getEmployeesAssignedToManager = asyncHandler(async (req, res) => {
  const managerId = req.params.id;

  const departments = await Department.find({ managerId }).select("_id");

  const employees = await Employee.find({
    departmentId: { $in: departments.map((d) => d._id) },
  }).populate({
    path: "departmentId",
    select: "name managerId",
  });

  handleSuccess(res, "Employees fetched successfully", 200, employees);
});

export {
  addEmployee,
  getEmployees,
  getSingleEmployee,
  updateEmployee,
  updateEmployeeStatus,
  totalEmployees,
  getEmployeeProfileDetails,
  sendBirthdayRemainderstoAdmin,
  getEmployeeBirthdays,
  getEmployeesAssignedToManager,
};
