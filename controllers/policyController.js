const { ObjectId } = require('mongodb');
const {Policy} = require('../models');
const mongoose = require('mongoose');

const POLICY_STATUS = {
    ACTIVE_POLICY: 'ACTIVE',
    DELETED_POLICY:'DELETED',

}
const policyController = {

 createPolicy : async (req, res)=>{
    console.log('Inside : crudController : createPolicy ');
    const { policyNumber, policyMode, policyType, policyStartDate, policyEndDate, premiumAmount, premiumAmountWritten } = req.body;
    const userStatus = USER_STATUS.ACTIVE_USER;
    try{
    // Create a new User using the User model
    const newPolicy = new Policy({
        policyNumber, policyMode, policyType, policyStartDate, policyEndDate, premiumAmount, 
        premiumAmountWritten

    });

    // Save the user to the database
    const savedUser = await newPolicy.save();

    res.status(201).json({message:'Policy created successfully',savedUser});
  } catch (error) {
    console.error('Error saving : Policy :', error);
    res.status(500).json({ error: 'Error saving Policy.' });
  }
 },
 fetchPolicies:async(req,res)=>{
    console.log('Inside : fetchPolicies : ');
    try{
    const userList = await Policy.find({
        status: { $ne: POLICY_STATUS.DELETED_POLICY } 
    });
    if(!userList){
       return res.status(404).json({message:'Not found',userList});
    }
    res.status(201).json({message:'Policy list',userList});
    }catch(error){

     console.error('Error fetching : Policy:', error);
    res.status(500).json({ error: 'Error fetching Policy.' });
    }

 },
fetchPolicy:async(req,res)=>{

    console.log('Inside : fetchPolicy : ');
    // console.log('requestParams : ' , req.param)
    const  id  = req.params.id;

    console.log('id : ', id);

    if(!id){
        return res.status(400).json({message :'Invalid request , Please check'})

    }
    const objectId = new mongoose.Types.ObjectId(id);
        console.log(' objectId :' , objectId);
    try{
        const user = await Policy.findOne({ _id: objectId, status: { $ne: ACCOUNT_STATUS.DELETED_ACCOUNT } });
    if(!user){
       return res.status(404).json({message:'Not found',user});
    }
    res.status(201).json({message:'Policy list',user});
    }catch(error){

     console.error('Error fetching : Policy:', error);
    res.status(500).json({ error: 'Error fetching : Policy.' });
    }

},
updatePolicy:async(req,res)=>{
    console.log('Inside : updatePolicy :');

    const  id  = req.params.id;
    console.log(' id :' , id);
    if(!id){
        return res.status(400).json({message :'Invalid request , Please check'})
    }
    
    const objectId = new mongoose.Types.ObjectId(userId);
        console.log(' objectId :' , objectId);

    const { firstName, email, city, phone, state, dateOfBirth, zipCode, address,
         gender ,accountName,accountType} = req.body;

    const requestBody = {
        firstName,email,city,phone,state,dateOfBirth,zipCode,address,gender,
        accountName,accountType
    }

        try{
        const updatedPolicy = await Policy.findByIdAndUpdate(objectId, requestBody, { new: true });
        if (!updatedPolicy) {
            return res.status(404).json({ error: 'updatedPolicy not found.' });
          }
          res.status(201).json({message:'Policy updated successfully !'});
        }catch(error){
            console.error('Error updating : Policy:', error);
            res.status(500).json({ error: 'Error  Policy updating .' });
        }

        },
//    PERFORM SOFT DELETING : JUST UPDATE STATUS :
    softDeletePolicy:async(req,res)=>{
      
        console.log('Inside : softDeletePolicy :');
        const  id  = req.params.id;
        console.log(' id :' , id);
        
        if(!userId){
            return res.status(400).json({message :'Invalid request , Please check'})
        }
        const objectId = new mongoose.Types.ObjectId(id);
        console.log(' objectId :' , objectId);

       
        const status = { status:POLICY_STATUS.DELETED_POLICY} ;
        try{
           
            const updatedPolicy = await Policy.findByIdAndUpdate(objectId, status, { new: true });
             res.status(201).json({message:'Policy das been deleted Successfully !',updatedPolicy})
        }catch(error){
            console.error('Error updating : Policy:', error);
            res.status(500).json({ error: 'Error  Policy updating .' });
        }
    },
    deletePolicy : async(req,res)=>{
        console.log('Inside : deletePolicy :');
        const  id  = req.params.id;
        console.log(' userId :' , id);
        
        if(!id){
            return res.status(400).json({message :'Invalid request , Please check'})
        }
        const objectId = new mongoose.Types.ObjectId(id);
        console.log(' objectId :' , objectId);

        // const status = { status:USER_STATUS.DELETED_USER} ;
        try{
           
            const updatedPolicy = await Policy.findByIdAndRemove(objectId);
             res.status(201).json({message:'Policy has been deleted Successfully !',updatedPolicy})
        }catch(error){
            console.error('Error updating : Policy:', error);
            res.status(500).json({ error: 'Error  Policy updating .' });
        }
    }

 }
        module.exports = policyController;