const { ObjectId } = require('mongodb');
const {UserAccount,} = require('../models');
const mongoose = require('mongoose');


const ACCOUNT_STATUS = {
    ACTIVE_ACCOUNT: 'ACTIVE',
    DELETED_ACCOUNT:'DELETED',

}
const accountController = {

 createAccount : async (req, res)=>{
    console.log('Inside : crudController : createAccount ');
    const { firstName, userType, email, city, phone, state, dateOfBirth, zipCode, address, 
        gender,accountName,accountType } = req.body;

        const userStatus = ACCOUNT_STATUS.ACTIVE_ACCOUNT;
    try{
    // Create a new User using the User model
    const newAccount = new UserAccount({
      firstName,
      userType,
      email,
      city,
      phone,
      state,
      dateOfBirth,
      zipCode,
      address,
      gender,
      userStatus,
      accountName,
      accountType

    });

    // Save the user to the database
    const savedUser = await newAccount.save();

    res.status(201).json({message:'Account created successfully',savedUser});
  } catch (error) {
    console.error('Error saving : Account :', error);
    res.status(500).json({ error: 'Error saving Account.' });
  }
 },
 fetchAccounts:async(req,res)=>{
    console.log('Inside : fetchUsers : ');
    try{
    const policyList = await UserAccount.find({
        status: { $ne: ACCOUNT_STATUS.DELETED_ACCOUNT } 
    });
    if(!userList){
       return res.status(404).json({message:'Not found',policyList});
    }
    res.status(201).json({message:'Account list',policyList});
    }catch(error){

     console.error('Error fetching : Account:', error);
    res.status(500).json({ error: 'Error fetching Account.' });
    }

 },
fetchAccount:async(req,res)=>{

    console.log('Inside : fetchAccount : ');
    // console.log('requestParams : ' , req.param)
    const  id  = req.params.id;

    console.log('id : ', id);

    if(!id){
        return res.status(400).json({message :'Invalid request , Please check'})

    }
    const objectId = new mongoose.Types.ObjectId(id);
        console.log(' objectId :' , objectId);
    try{
        const policy = await UserAccount.findOne({ _id: objectId, status: { $ne: ACCOUNT_STATUS.DELETED_ACCOUNT } });
    if(!user){
       return res.status(404).json({message:'Not found',policy});
    }
    res.status(201).json({message:' Policy Data ',policy});
    }catch(error){

     console.error('Error fetching : Policy:', error);
    res.status(500).json({ error: 'Error fetching : Policy.' });
    }

},
updateAccount:async(req,res)=>{
    console.log('Inside : updateAccount :');

    const  id = req.params.id;
    console.log(' id :' , id);
    if(!id){
        return res.status(400).json({message :'Invalid request , Please check'})
    }
    
    const objectId = new mongoose.Types.ObjectId(id);
        console.log(' objectId :' , objectId);

    const { firstName, email, city, phone, state, dateOfBirth, zipCode, address,
         gender ,accountName,accountType} = req.body;

    const requestBody = {
        firstName,email,city,phone,state,dateOfBirth,zipCode,address,gender,
        accountName,accountType
    }

        try{
        const updatedAccount = await UserAccount.findByIdAndUpdate(objectId, requestBody, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'updatedAccount not found.' });
          }
          res.status(201).json({message:'updatedAccount updated successfully !' , updatedAccount});
        }catch(error){
            console.error('Error updating : Account:', error);
            res.status(500).json({ error: 'Error  Account:  updating .' });
        }

        },
//    PERFORM SOFT DELETING : JUST UPDATE STATUS :
    softDeleteAccount:async(req,res)=>{
      
        console.log('Inside : softDeleteAccount :');
        const  id = req.params.id;
        console.log(' id :' , id);
        
        if(!id){
            return res.status(400).json({message :'Invalid request , Please check'})
        }
        const objectId = new mongoose.Types.ObjectId(id);
        console.log(' objectId :' , objectId);

       
        const status = { status:ACCOUNT_STATUS.DELETED_ACCOUNT} ;
        try{
           
            const updatedAccount= await UserAccount.findByIdAndUpdate(objectId, status, { new: true });
             res.status(201).json({message:'Account has been deleted Successfully !',updatedAccount})
        }catch(error){
            console.error('Error updating : user:', error);
            res.status(500).json({ error: 'Error  Account updating .' });
        }
    },
    deleteAccount : async(req,res)=>{
        console.log('Inside : deleteUser :');
        const  id  = req.params.id;
        console.log(' id :' , id);
        

        if(!id){
            return res.status(400).json({message :'Invalid request , Please check'})
        }
        const objectId = new mongoose.Types.ObjectId(id);
        console.log(' objectId :' , objectId);

        // const status = { status:USER_STATUS.DELETED_USER} ;
        try{
           
            const deletedAccount = await UserAccount.findByIdAndRemove(objectId);
             res.status(201).json({message:'Account has been deleted Successfully !',deletedAccount})
        }catch(error){
            console.error('Error updating : account :', error);
            res.status(500).json({ error: 'Error  Account updating .' });
        }
    }

 }
        module.exports = accountController;