const HL7 = require('hl7-standard');
const FS = require('fs');
// const LUXON = require('luxon');
const MOMENT = require('moment');

let content = FS.readFileSync('d:\\hl7\\adt_a01.hl7', { encoding: 'ascii' });

let hl7 = new HL7(content);

hl7.transform();

console.log(hl7.getSegment('PID').get('PID.5.2'));

let familyName = hl7.getSegment('PID').get('PID.5.1');
let givenName = hl7.getSegment('PID').get('PID.5.2');
// let birthdate = LUXON.DateTime.fromISO(hl7.getSegment('PID').get('PID.7')).toFormat('yyyy-MM-dd');
let birthdate = MOMENT(hl7.getSegment('PID').get('PID.7'),'YYYYMMDD').format('YYYY-MM-DD');

switch(hl7.getSegment('PID').get('PID.8')) {
    case 'M': 
        gender = 'male';
        break;
    case 'F': 
        gender = 'female';
        break;
    case 'A': 
        gender = 'other';
        break;
    default: 
        gender = 'unknown'
         break;
}

console.log(familyName);
console.log(givenName);
console.log(birthdate);
console.log(gender);

let patient = {
  resourceType: 'Patient',
  name: [ {
      family: familyName,
      "given": [ givenName ]
  } ],
  "gender": gender,
  "birthDate": birthdate
}

console.log(JSON.stringify(patient,null,2));

return JSON.stringify(patient,null,2);