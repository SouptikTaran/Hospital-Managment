import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Cake,
  Briefcase,
  Shield,
  User,
  UserPlus,
  Edit,
  Cookie,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// Mock data (in a real application, this would come from an API or database)
// const initialPatientData = {
//   id: "PT12345",
//   name: "Jane A. Doe",
//   dateOfBirth: "1988-05-15",
//   gender: "Female",
//   bloodType: "A+",
//   phone: "+1 (555) 123-4567",
//   email: "jane.doe@example.com",
//   address: "123 Main St, Suite 4B, Anytown, USA 12345",
//   occupation: "Software Engineer",
//   emergencyContact: {
//     name: "John Doe",
//     relation: "Spouse",
//     phone: "+1 (555) 987-6543",
//   },
//   insurance: {
//     provider: "HealthGuard Insurance",
//     policyNumber: "HG-987654321",
//     groupNumber: "GRP-001122",
//   },
//   primaryCarePhysician: {
//     name: "Dr. Emily Johnson",
//     phone: "+1 (555) 246-8135",
//     clinic: "Anytown Medical Center",
//   },
//   allergies: ["Penicillin", "Latex"],
//   chronicConditions: ["Hypertension", "Type 2 Diabetes"],
// };

export default function Profile() {
  // const [patientData, setPatientData] = useState(initialPatientData);
  const [isEditing, setIsEditing] = useState(false);
  //all the fields 
  const [birthDate,setBirthDate]=useState("");
  const [FirstName,SetFirstName]=useState("");
  const [LastName,SetLastName]=useState("")
  const [phoneNumber,SetPhoneNumber]=useState("");
  const [occupation,SetOccupation]=useState("");
  const [alternateContact,SetAlternateContact]=useState("");
  const [address,SetAddress]=useState("");
  const [bloodGroup,SetBloodGroup]=useState("");
  const [email,setEmail]=useState("");
  const [gender,setGender]=useState("");
  const [name,setName]=useState("");
  const [id,setId]=useState("");
  // console.log("dob",birthDate);
//to format dob
  const formatDate = (isoDate:Date) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  //fetching patient's details
  const FetchPatientProfile=async()=>{
    try {
      const token=Cookies.get('token');
      const response=await axios.get('http://localhost:5000/api/patient/get-profile',{
      
        headers:{
          authorization:'Bearer '+ token
        }
      })
      console.log("response:",response.data);
      setBirthDate(formatDate(response.data.patientInfo.birthDate));
      SetPhoneNumber(response.data.patientInfo.phoneNumber);
      SetOccupation(response.data.patientInfo.occupation);
      SetAlternateContact(response.data.patientInfo.alternateContact);
      SetAddress(response.data.patientInfo.address);
      SetFirstName(response.data.patientInfo.firstName);
      SetLastName(response.data.patientInfo.lastName);
      SetBloodGroup(response.data.patientInfo.bloodGroup);
      setEmail(response.data.patientInfo.email);
      setGender(response.data.patientInfo.gender);
      setId(response.data.patientInfo._id);
      // setPatientData(response.data);
      setName(response.data.name);
      // console.log("first name in the function:",FirstName);
      return response.data;
    } catch (error) {
        console.error("error:",error);
    }
  }

  useEffect(()=>{
      const patient=FetchPatientProfile();
      
      // console.log("patient Data:",patientData);
  },[])
  // Function to handle input changes
  const handleChange = (field: string, value: string | number | object) => {
    // setPatientData((prev) => ({

    //   ...prev,
    //   [field]: value,
    // }));
  };

  // Function to toggle editing mode
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };


  const EdittedData:any={
      phoneNumber,address,occupation,alternateContact,birthDate
  }
  // Function to handle save
  const handleSave = async () => {
    // Add logic to push/save the updated patient data
    try {
      const token=Cookies.get('token');

      const response=await axios.put('http://localhost:5000/api/patient/edit-profile',
        EdittedData,{
          headers:{
            authorization:'Bearer '+ token
          }
        }
      )

    } catch (error) {
      
    }
    // For now, we'll just log it and show a message
    // console.log("Saved Data:", patientData);
    setIsEditing(false); // Disable editing mode
  };
  // const HandleCancel=()={
  //   setIsEditing(false);
  // }
  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Card className="mb-6">
        <CardHeader className="text-center">
          <Avatar className="h-32 w-32 mx-auto mb-4">
            <AvatarImage
              src="https://avatar.iran.liara.run/public?height=128&width=128"
              alt={name}
            />
            <AvatarFallback>
              {name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl font-semibold">
              {isEditing?
              <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-b border-gray-300 focus:outline-none focus:border-gray-600"
              disabled={!isEditing}
            />:
            <div    
            className="border-b border-gray-300 focus:outline-none focus:border-gray-600">
              {name}
            </div>
              }
              
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Patient ID: {id}
            </p>
            <div className="flex justify-center items-center mt-2 space-x-2">
              <Badge variant="outline">
                {isEditing?
                <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="border border-gray-300 rounded p-1"
                disabled>
                <option value="Male">Male</option>
                <option value="Female">Female</option>  
              </select>:
                <div    
                  className=" bg-gray-200 px-3 p-1 rounded-full focus:outline-none focus:border-gray-600">
                  {gender}
                </div>
                }
              </Badge>
              <Badge variant="outline">
                {isEditing?
                  <input
                  type="text"
                  value={bloodGroup}
                  onChange={(e) => SetBloodGroup(e.target.value)}
                  className="border-b border-gray-300 focus:outline-none focus:border-gray-600"
                  disabled
                />:
                <div    
                className=" bg-gray-200 px-3 p-1 rounded-full focus:outline-none focus:border-gray-600">
                {bloodGroup}
              </div>
                }
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <InfoItem
                icon={<Cake className="h-5 w-5" />}
                label="Date of Birth"
                value={
                  isEditing?<input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate( e.target.value)}
                  className="border border-gray-300 rounded p-1"
                  disabled={!isEditing}
                />:
                <div    
                className=" px-3 p-1 rounded-full focus:outline-none focus:border-gray-600">
                {birthDate}
              </div>
                  
                }
              />
              <InfoItem
                icon={<Phone className="h-5 w-5" />}
                label="Phone"
                value={
                  isEditing?
                  <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => SetPhoneNumber(e.target.value)}
                  className="border border-gray-300 rounded p-1"
                  disabled={!isEditing}
                />:
              <div    
                className=" px-3 p-1 rounded-full focus:outline-none focus:border-gray-600">
                {phoneNumber}
              </div>
                }
              />
              <InfoItem
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value={
                    isEditing?                
                    <input
                    type="email"
                    value={email}
                    onChange={(e) =>setEmail(e.target.value)}
                    className="border border-gray-300 rounded p-1"
                    disabled
                  />:
                <div    
                  className=" px-3 p-1 rounded-full focus:outline-none focus:border-gray-600">
                  {email}
                </div>

                }
              />
              <InfoItem
                icon={<MapPin className="h-5 w-5" />}
                label="Address"
                value={
                  isEditing?
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => SetAddress(e.target.value)}
                    className="border border-gray-300 rounded p-1"
                    disabled={!isEditing}
                  />:
                  <div    
                  className=" px-3 p-1 rounded-full focus:outline-none focus:border-gray-600">
                  {address}
                </div>
                }
              />
              <InfoItem
                icon={<Briefcase className="h-5 w-5" />}
                label="Occupation"
                value={
                  isEditing?
                  <input
                    type="text"
                    value={occupation}
                    onChange={(e) => SetOccupation(e.target.value)}
                    className="border border-gray-300 rounded p-1"
                    disabled={!isEditing}
                  />:
                  <div    
                  className=" px-3 p-1 rounded-full focus:outline-none focus:border-gray-600">
                  {occupation}
                </div>
                }
              />
            </div>
            <div className="space-y-4">
              <InfoItem
                icon={<User className="h-5 w-5" />}
                label="Primary Care Physician"
                value={
                  isEditing?
                  <>
                    <input
                      type="text"
                      value="Dr Nicholas"
                      onChange={(e) =>
                        handleChange("primaryCarePhysician.name", e.target.value)
                      }
                      className="border border-gray-300 rounded p-1 mb-2 block"
                      disabled
                    />
                    <input
                      type="text"
                      value="City Medical Center"
                      onChange={(e) =>
                        handleChange("primaryCarePhysician.clinic", e.target.value)
                      }
                      className="border border-gray-300 rounded p-1"
                      disabled
                    />
                  </>:
                  <>
                  <div    
                      className=" px-3 p-1 font-bold rounded-full focus:outline-none focus:border-gray-600">
                        Dr. Nicholas
                  </div>
                  <div    
                      className=" px-3 p-1 rounded-full focus:outline-none focus:border-gray-600">
                          City Medical Center
                  </div>
                  </>

                }
              />
              <InfoItem
                icon={<UserPlus className="h-5 w-5" />}
                label="Emergency Contact"
                value={
                    isEditing?
                    <>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) =>
                        handleChange("emergencyContact.name", e.target.value)
                      }
                      className="border border-gray-300 rounded p-1 mb-2 block"
                      disabled={!isEditing}
                    />
                    <input
                      type="text"
                      value={alternateContact}
                      onChange={(e) =>
                        SetAlternateContact(e.target.value)
                      }
                      className="border border-gray-300 rounded p-1"
                      // disabled={!isEditing}
                    />
                  </>:
                  <>
                  <div    
                      className=" px-3 p-1 font-bold rounded-full focus:outline-none focus:border-gray-600">
                        {name}
                  </div>
                  <div    
                      className=" px-3 p-1 rounded-full focus:outline-none focus:border-gray-600">
                          {alternateContact}
                  </div>
                  </>
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Insurance Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoItem
            icon={<Shield className="h-5 w-5" />}
            label="Insurance Provider"
            value={
              <input
                type="text"
                value=""
                onChange={(e) => handleChange("insurance.provider", e.target.value)}
                className="border border-gray-300 rounded p-1"
                disabled
              />
            }
          />
          <InfoItem
            icon={<Shield className="h-5 w-5" />}
            label="Policy Number"
            value={
              <input
                type="text"
                value=""
                onChange={(e) => handleChange("insurance.policyNumber", e.target.value)}
                className="border border-gray-300 rounded p-1"
                disabled
              />
            }
          />
          <InfoItem
            icon={<Shield className="h-5 w-5" />}
            label="Group Number"
            value={
              <input
                type="text"
                value=""
                onChange={(e) => handleChange("insurance.groupNumber", e.target.value)}
                className="border border-gray-300 rounded p-1"
                disabled
              />
            }
          />
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end gap-3">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        ) : (
          <button
            onClick={toggleEditing}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Edit
          </button>
        )}
          <button
            onClick={()=>{setIsEditing(false)
                FetchPatientProfile();
            }
            }
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-blue-700"

          >
            Cancel
          </button>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: JSX.Element; label: string; value: JSX.Element }) {
  return (
    <div className="flex flex-col w-full items-start text-gray-600 space-x-4 p-4 ">
      <div className="flex gap-5">
        <div className="flex ">{icon}</div>
        <p className="font-medium">{label}</p>
      </div>
      <div className="mt-1 w-full">{value}</div>
    </div>
  );
}
