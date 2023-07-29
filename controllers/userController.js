const { ObjectId } = require('mongodb');
const {Agent,User,} = require('../models');
const mongoose = require('mongoose');

const USER_STATUS = {
    ACTIVE_USER : 'ACTIVE',
    DELETED_USER:'DELETED'
}
const userController = {

 createUser : async (req, res)=>{
    console.log('Inside : crudController : createUser ');
    const { firstName, userType, email, city, phone, state, dateOfBirth, zipCode, address, gender } = req.body;
    const userStatus = USER_STATUS.ACTIVE_USER;
    try{
    // Create a new User using the User model
    const newUser = new User({
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
      userStatus

    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json({message:'User created successfully',savedUser});
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Error saving user.' });
  }
 },
 fetchUsers:async(req,res)=>{
    console.log('Inside : fetchUsers : ');
    try{
    const userList = await User.find({
        status: { $ne: USER_STATUS.DELETED_USER } 
    });
    if(!userList){
       return res.status(404).json({message:'Not found',userList});
    }
    res.status(201).json({message:'Use list',userList});
    }catch(error){

     console.error('Error fetching : user:', error);
    res.status(500).json({ error: 'Error fetching user.' });
    }

 },
fetchUser:async(req,res)=>{

    console.log('Inside : fetchUser : ');
    // console.log('requestParams : ' , req.param)
    const  id  = req.params.id;

    console.log('id : ', userId);

    if(!id){
        return res.status(400).json({message :'Invalid request , Please check'})

    }
    const objectId = new mongoose.Types.ObjectId(id);
        console.log(' objectId :' , objectId);
    try{
        const user = await User.findOne({ _id: objectId, status: { $ne: USER_STATUS.DELETED_USER } });
    if(!user){
       return res.status(404).json({message:'Not found',user});
    }
    res.status(201).json({message:'Use list',user});
    }catch(error){

     console.error('Error fetching : user:', error);
    res.status(500).json({ error: 'Error fetching user.' });
    }

},
updateUser:async(req,res)=>{
    console.log('Inside : updateUser :');

    const  id  = req.params.id;
    console.log(' id :' , id);
    if(!userId){
        return res.status(400).json({message :'Invalid request , Please check'})
    }
    
    const objectId = new mongoose.Types.ObjectId(id);
        console.log(' objectId :' , objectId);

    const { firstName, email, city, phone, state, dateOfBirth, zipCode, address, gender } = req.body;

    const requestBody = {
        firstName,email,city,phone,state,dateOfBirth,zipCode,address,gender
    }

        try{
        const updatedUser = await User.findByIdAndUpdate(objectId, requestBody, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' });
          }
          res.status(201).json({message:'User updated successfully !'});
        }catch(error){
            console.error('Error updating : user:', error);
            res.status(500).json({ error: 'Error  user updating .' });
        }

        },
//    PERFORM SOFT DELETING : JUST UPDATE STATUS :
    softDeleteUser:async(req,res)=>{
      
        console.log('Inside : softDeleteUser :');
        const  id  = req.params.id;
        console.log(' id :' , id);
        
        const objectId = new mongoose.Types.ObjectId(id);
        console.log(' objectId :' , objectId);

        if(!userId){
            return res.status(400).json({message :'Invalid request , Please check'})
        }
        const status = { status:USER_STATUS.DELETED_USER} ;
        try{
           
            const updatedUser = await User.findByIdAndUpdate(objectId, status, { new: true });
             res.status(201).json({message:'User das been deleted Successfully !',updatedUser})
        }catch(error){
            console.error('Error updating : user:', error);
            res.status(500).json({ error: 'Error  user updating .' });
        }
    },
    deleteUser : async(req,res)=>{
        console.log('Inside : deleteUser :');
        const  id  = req.params.id;
        console.log(' userId :' , userId);

        if(!id){
            return res.status(400).json({message :'Invalid request , Please check'})
        }
        const objectId = new mongoose.Types.ObjectId(id);
        console.log(' objectId :' , objectId);
        // const status = { status:USER_STATUS.DELETED_USER} ;
        try{
           
            const updatedUser = await User.findByIdAndRemove(objectId);
             res.status(201).json({message:'User das been deleted Successfully !',updatedUser})
        }catch(error){
            console.error('Error updating : user:', error);
            res.status(500).json({ error: 'Error  user updating .' });
        }
    }

 }
        module.exports = userController;