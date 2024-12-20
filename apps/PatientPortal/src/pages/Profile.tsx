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
} from "lucide-react";
import { useState } from "react";

// Mock data (in a real application, this would come from an API or database)
const initialPatientData = {
  id: "PT12345",
  name: "Jane A. Doe",
  dateOfBirth: "1988-05-15",
  gender: "Female",
  bloodType: "A+",
  phone: "+1 (555) 123-4567",
  email: "jane.doe@example.com",
  address: "123 Main St, Suite 4B, Anytown, USA 12345",
  occupation: "Software Engineer",
  emergencyContact: {
    name: "John Doe",
    relation: "Spouse",
    phone: "+1 (555) 987-6543",
  },
  insurance: {
    provider: "HealthGuard Insurance",
    policyNumber: "HG-987654321",
    groupNumber: "GRP-001122",
  },
  primaryCarePhysician: {
    name: "Dr. Emily Johnson",
    phone: "+1 (555) 246-8135",
    clinic: "Anytown Medical Center",
  },
  allergies: ["Penicillin", "Latex"],
  chronicConditions: ["Hypertension", "Type 2 Diabetes"],
};

export default function Profile() {
  const [patientData, setPatientData] = useState(initialPatientData);
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle input changes
  const handleChange = (field: string, value: string | number | object) => {
    setPatientData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function to toggle editing mode
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  // Function to handle save
  const handleSave = () => {
    // Add logic to push/save the updated patient data
    // For now, we'll just log it and show a message
    console.log("Saved Data:", patientData);
    setIsEditing(false); // Disable editing mode
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Card className="mb-6">
        <CardHeader className="text-center">
          <Avatar className="h-32 w-32 mx-auto mb-4">
            <AvatarImage
              src="https://avatar.iran.liara.run/public?height=128&width=128"
              alt={patientData.name}
            />
            <AvatarFallback>
              {patientData.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl font-semibold">
              <input
                type="text"
                value={patientData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="border-b border-gray-300 focus:outline-none focus:border-gray-600"
                disabled={!isEditing}
              />
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Patient ID: {patientData.id}
            </p>
            <div className="flex justify-center items-center mt-2 space-x-2">
              <Badge variant="outline">
                <select
                  value={patientData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="border border-gray-300 rounded p-1"
                  disabled
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>  
                </select>
              </Badge>
              <Badge variant="outline">
                <input
                  type="text"
                  value={patientData.bloodType}
                  onChange={(e) => handleChange("bloodType", e.target.value)}
                  className="border-b border-gray-300 focus:outline-none focus:border-gray-600"
                  disabled
                />
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
                  <input
                    type="date"
                    value={patientData.dateOfBirth}
                    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                    className="border border-gray-300 rounded p-1"
                    disabled={!isEditing}
                  />
                }
              />
              <InfoItem
                icon={<Phone className="h-5 w-5" />}
                label="Phone"
                value={
                  <input
                    type="text"
                    value={patientData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="border border-gray-300 rounded p-1"
                    disabled={!isEditing}
                  />
                }
              />
              <InfoItem
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value={
                  <input
                    type="email"
                    value={patientData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="border border-gray-300 rounded p-1"
                    disabled
                  />
                }
              />
              <InfoItem
                icon={<MapPin className="h-5 w-5" />}
                label="Address"
                value={
                  <input
                    type="text"
                    value={patientData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="border border-gray-300 rounded p-1"
                    disabled={!isEditing}
                  />
                }
              />
              <InfoItem
                icon={<Briefcase className="h-5 w-5" />}
                label="Occupation"
                value={
                  <input
                    type="text"
                    value={patientData.occupation}
                    onChange={(e) => handleChange("occupation", e.target.value)}
                    className="border border-gray-300 rounded p-1"
                    disabled={!isEditing}
                  />
                }
              />
            </div>
            <div className="space-y-4">
              <InfoItem
                icon={<User className="h-5 w-5" />}
                label="Primary Care Physician"
                value={
                  <>
                    <input
                      type="text"
                      value={patientData.primaryCarePhysician.name}
                      onChange={(e) =>
                        handleChange("primaryCarePhysician.name", e.target.value)
                      }
                      className="border border-gray-300 rounded p-1 mb-2 block"
                      disabled
                    />
                    <input
                      type="text"
                      value={patientData.primaryCarePhysician.clinic}
                      onChange={(e) =>
                        handleChange("primaryCarePhysician.clinic", e.target.value)
                      }
                      className="border border-gray-300 rounded p-1"
                      disabled
                    />
                  </>
                }
              />
              <InfoItem
                icon={<UserPlus className="h-5 w-5" />}
                label="Emergency Contact"
                value={
                  <>
                    <input
                      type="text"
                      value={patientData.emergencyContact.name}
                      onChange={(e) =>
                        handleChange("emergencyContact.name", e.target.value)
                      }
                      className="border border-gray-300 rounded p-1 mb-2 block"
                      disabled={!isEditing}
                    />
                    <input
                      type="text"
                      value={patientData.emergencyContact.phone}
                      onChange={(e) =>
                        handleChange("emergencyContact.phone", e.target.value)
                      }
                      className="border border-gray-300 rounded p-1"
                      disabled={!isEditing}
                    />
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
                value={patientData.insurance.provider}
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
                value={patientData.insurance.policyNumber}
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
                value={patientData.insurance.groupNumber}
                onChange={(e) => handleChange("insurance.groupNumber", e.target.value)}
                className="border border-gray-300 rounded p-1"
                disabled
              />
            }
          />
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end">
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
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: JSX.Element; label: string; value: JSX.Element }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-grow">
        <p className="font-medium">{label}</p>
        <div className="mt-1">{value}</div>
      </div>
    </div>
  );
}
