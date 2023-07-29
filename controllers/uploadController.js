
const csvtojson = require('csvtojson');
const {Agent,
  User,
  UserAccount,
  LOB,
  Carrier,
  Policy,} = require('../models');
const xlsx = require('xlsx');

const HTTP_STATUS = require('../constants/httpStatusConstant')

console.log(HTTP_STATUS)
const UploadController = {

  uploadData: async (req, res) => {
    console.log('Inside : UploadController : ')
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const file = req.file.path; 

    const extension = file.split('.').pop().toLowerCase();
  
    console.log('extension :' , extension);

    if (file.endsWith('.csv')) {
      // Handle CSV file
      console.log(' read csv file : ');

      const chunkSize = 100 ;

      try {

        console.log('Inside csv try block : ')
        const fileData = await csvtojson().fromFile(file);

        console.log('total-data : ' , fileData.length);
//   testing data :
//  const tempData = 
//   {
//     "agent": "Rita Ora",
//     "userType": "Active Client",
//     "policy_mode": "6",
//     "producer": "Rosalee Gilford",
//     "policy_number": "5I2X1Y7QDONF",
//     "premium_amount_written": "",
//     "premium_amount": "854.95",
//     "policy_type": "Single",
//     "company_name": "Nationwide Mut Ins Co_Copy",
//     "category_name": "Personal Auto",
//     "policy_start_date": "2018-12-28",
//     "policy_end_date": "2019-06-28",
//     "csr": "Burton Stanley",
//     "account_name": "Sheridan Swinger & Josefa Wiley",
//     "email": "pizza@att.net",
//     "gender": "Male",
//     "firstname": "Sheridan Swinger",
//     "city": "Madison",
//     "account_type": "Personal",
//     "phone": "3619988897",
//     "address": "2115 Bryant St",
//     "state": "NC",
//     "zip": "27025-9701",
//     "dob": "1968-10-19",
//     "primary": "",
//     "Applicant ID": "",
//     "agency_id": "",
//     "hasActive ClientPolicy": ""
//   }
      let result;
       for (let data = 0; data < fileData.length; data += chunkSize) {

        console.log('Inside : for: loop : ')
        const chunkData = fileData.slice(data, data + chunkSize);
     
        for(const record of chunkData){
          try{
            console.log('Inside Promise try block : ')
             result = await Promise.all([
             await saveAgentInfo(record),
             await saveUserInfo(record),
             await saveUserAccount(record),
             await savePolicy(record)
            ])
  
          }catch(error){
             
            console.log('Inside : catch block : error : result' , error);
            // res.status(500).json({ error: 'Error  from saving data.' });
  
          }
        }
        console.log(`Chunk ${data / chunkSize + 1} inserted.`);
      }

      } catch (error) {
        console.error('Error converting CSV to JSON', error);
        return res.status(500).json({ error: 'Error converting CSV to JSON' });
      }
    } 

    else if (file.endsWith('.xlsx')) {
      // Handle XLSX file (You may need to install "xlsx" package)
      
      const workbook = xlsx.readFile(file);
      const data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      
     
    } else {
      res.status(400).json({ error: 'Invalid file format' });
    }
    res.status(201).json({message :'Data save successfully !'});
  },
  
};

async function saveAgentInfo(agentData) {
  console.log('Inside: saveAgentInfo');

  // console.log('agentData : ' , agentData)
  const agents = new Agent({
    agentName: agentData?.agent,
    agencyId: agentData?.agency_id ?? null,
  });

  // console.log('agents:', agents);
  
   return await agents.save();
  
}
//  function to save user data :

async function saveUserInfo(userData) {
  console.log('Inside: saveUserInfo');

  const user = new User({
    firstName: userData?.firstname,
    userType:userData?.userType,
    email:userData?.email,
    city:userData?.city,
    phone:userData?.phone,
    state:userData?.state,
    dateOfBirth:userData?.dob,
    zipCode:userData?.zip,
    address:userData?.address,
    gender:userData?.gender

  });

  // console.log('user:', user);

   return await user.save();
  
}
//  save user account

async function saveUserAccount(userAccountData) {
  console.log('Inside: saveUserAccount');

  const user = new UserAccount({
    accountName: userAccountData?.account_name,
    accountType:userAccountData?.account_type,
    userType:userAccountData?.userType,
    email:userAccountData?.email,
    city:userAccountData?.city,
    phone:userAccountData?.phone,
    state:userAccountData?.state,
    dateOfBirth:userAccountData?.dob,
    zipCode:userAccountData?.zip,
    address:userAccountData?.address,
    gender:userAccountData?.gender

  });

  // console.log('user:', user);
  
    return await user.save();
  
}

// save polity :
async function savePolicy(policyData) {
  console.log('Inside: saveUserAccount');
  
  const policy = new Policy({
    policyNumber:policyData?.policy_number,
    policyMode:policyData?.policy_mode,
    policyType:policyData?.policy_type,
    policyStartDate:policyData?.policy_start_date,
    policyEndDate:policyData?.policy_end_date,
    premiumAmount:policyData?.premium_amount,
    premiumAmountWritten:policyData?.premium_amount_written

  });

  // console.log('policy:', policy);  
    return await policy.save();
}

// save lob

// TODO : NEED TO STORE IN CARRIER , LOBS DATA NEED TO HELP.
module.exports = UploadController;
