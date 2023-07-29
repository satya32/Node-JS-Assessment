
// routes/upload.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/uploadController');
const userController = require('../controllers/userController');
const accountController = require('../controllers/accountController');
const policyController = require('../controllers/policyController');

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });


router.post('/save', upload.single('file'), uploadController.uploadData);
//  crud user : router :
 router.post('/user/create',userController.createUser);
 router.get('/user/fetch',userController.fetchUsers);
 router.get('/user/:id',userController.fetchUser);
 router.put('/user/:id',userController.updateUser);
 router.patch('/user/:id',userController.softDeleteUser);
 router.delete('/user/:id',userController.deleteUser)
// crud : account : router : 

 router.post('/account/create',accountController.createAccount);
 router.get('/account/fetch',accountController.fetchAccounts);
 router.get('/account/:id',accountController.fetchAccount);
 router.put('/account/:id',accountController.updateAccount);
 router.patch('/account/:id',accountController.softDeleteAccount);
 router.delete('/account/:id',accountController.deleteAccount)
// crud : policy : router

router.post('/policy/create',policyController.createPolicy);
 router.get('/policy/fetch',policyController.fetchPolicies);
 router.get('/policy/:id',policyController.fetchPolicy);
 router.put('/policy/:id',policyController.updatePolicy);
 router.patch('/policy/:id',policyController.softDeletePolicy);
 router.delete('/policy/:id',policyController.deletePolicy)

module.exports = router;
