
import * as React from 'react'
import { useState, useEffect } from 'react'
import { format, addDays, isBefore, isAfter, startOfDay } from 'date-fns'
import { CalendarIcon, Clock, User, Mail, Phone, Stethoscope, AlertCircle, icons, SyringeIcon } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { Button } from "@repo/ui/components/ui/button"
// import { Calendar } from "@repo/ui/components/ui/calendar"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select"
import { Input } from "@repo/ui/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { toast } from "@repo/ui/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui/alert"
import { HeartPulse,Brain,Bone,Baby,BrainCircuit,UserRound} from 'lucide-react'
import { cn } from "@repo/ui/lib/utils"
import { time } from 'console'

const appointmentTypes = [
  { value: 'Cardiology', label: 'Cardiology' ,icons:<HeartPulse color='#3b82f6' size={18}/>},
  { value: 'Neurology', label: 'Neurology' ,icons:<BrainCircuit color='#3b82f6' size={18}/>},
  { value: 'Orthopedics', label: 'Orthopedics' ,icons:<Bone color='#3b82f6' size={18}/>},
  { value: 'Pediatrics', label: 'Pediatric Care',icons:<Baby color='#3b82f6' size={18}/> },
  { value: 'Dermatology', label: 'Dermatology',icons:<SyringeIcon color='#3b82f6' size={18}/>},
  { value: 'Psychiatry', label: 'Psychiatry' ,icons:<Brain color='#3b82f6' size={18}/>},
]

const timeSlots = [
  '09:00 AM', '10:00 AM',  '11:00 AM', '01:00 PM', '02:00 PM',  '03:00 PM',  '04:00 PM'
]

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().regex(/^\d{10}$/, { message: "Phone number must be 10 digits." }),
  appointmentType: z.string({ required_error: "Please select an appointment type." }),
  doctorId: z.string({required_error:"Please select a doctor"}),
  date: z.date({ required_error: "Please select a date." }),
  timeSlot: z.string({ required_error: "Please select a time slot." }),
  startTime: z.string({required_error:"start time needs to be provided"}),
  endTime:z.string({required_error:"end time needs to be provided"}),
  symptoms: z.string().max(500, { message: "Symptoms must not exceed 500 characters." }).optional(),
})


export default function Booking() {
  const [date, setDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [doctors,setDoctors]=useState<{doctorName:string;doctorId:string,specialization:string}[]>([]);
  const [selectedDate,setSelectedDate] = useState(new Date());
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      appointmentType: undefined,
      doctorId:"",
      date: undefined,
      timeSlot: "",
      startTime:"",
      endTime:"",
      symptoms: "",
    },
  })


  //fetch all the doctors 

  const fetchDoctors=async() =>{
    try {
      const response=await axios.get('http://localhost:5000/api/doctor/getDoctors',
        {
          params:{specialization: form.getValues('appointmentType')}
        }
      );
      console.log("doctors in consolelog:",response.data.doctors);
      setDoctors(response.data.doctors);
      // console.log("doctors in setDoctors:",doctors);
      return response.data.doctors;
    }catch (error) {
        console.error("error fetching doctors: ",error);
    }

  }

  //for calculating start and end time
  const appointmentType=form.watch('appointmentType');
  const timeSlot=form.watch('timeSlot');
  const hours:any=timeSlot?.split(':');
  const minutesAndPeriods:any=hours[1]?.split(" ");
  console.log(timeSlot); 
  const   CalStartNendTime=()=>{
      if(!timeSlot){return 0}
     //minutesAndPeriods[0]=00 minutesAndPeriods[1]=AM|PM
      const StartTime=timeSlot;
      let EndTime=" ";
      console.log("hours:",hours[0])
      console.log("minutes:",minutesAndPeriods[0]);
        let hoursValue=hours?parseInt(hours[0], 10):0;
        let minutesValue=minutesAndPeriods && minutesAndPeriods[0]?String(minutesAndPeriods[0]).padStart(2,'0'):0;
        let period=minutesAndPeriods?minutesAndPeriods[1]:"";
        if(hoursValue===11&&period==="AM"){
            period="PM"
        }
        else if(hoursValue===11&&period==="PM"){
           period="AM"
        }
        hoursValue+=1;
        EndTime= `${hoursValue}:${minutesValue} ${period}`;
        console.log("start time:",StartTime);
        console.log("end time:",EndTime);


        form.setValue('startTime',StartTime);
        form.setValue('endTime',EndTime);
        form.setValue('timeSlot',timeSlot);
        // return {"startTime":StartTime,"endTime":EndTime};
  }

  useEffect(()=>{
      CalStartNendTime();   
  },[timeSlots]);
  useEffect(()=>{
      const fetchData= async ()=>{
          const doctorsData=await fetchDoctors();
          setDoctors(doctorsData);
      }
      fetchData();  
      // console.log("doctors fetched:",doctors);
      console.log(form.getValues('appointmentType'));
  },[appointmentType]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    // Simulate API call
    // await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    console.log('Form submitted:', data);
    const response = await axios.post("http://localhost:5000/api/patient/book-appointment",data);
    console.log(response?.data)

    toast({
      title: "Appointment Booked",
      description: `Your appointment has been scheduled for ${format(data.date, 'MMMM d, yyyy')} at ${data.timeSlot}.`,
    })
    // form.reset()
    setDate(undefined)
  }


  // for setting calendar value
  const handleSelectedDate=(date:any)=>{
      setSelectedDate(date);
      console.log("selectedDate is: ",selectedDate);
      form.setValue('date',selectedDate);
      console.log("form date:",form.getValues('date'));
  }
  
  return (
    <div className=" w-full  my-5 ">
      <Card className="w-full flex flex-col items-center ">
        <CardHeader className='mb-2 w-[95%]'>
          <CardTitle className="text-2xl font-bold text-primary">Book Your Appointment</CardTitle>
          <CardDescription className=''>Fill out the form below to schedule your visit to our hospital.</CardDescription>
        </CardHeader>
        <CardContent className='w-full flex justify-evenly'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex justify-evenly w-[100%] ">
              {/* for choosing appointments */}
              <div className='flex flex-col gap-4 w-[55%] '>
              <FormField
                  control={form.control}
                  name="appointmentType"
                  render={({ field }) => (
                    <FormItem >
                      <FormLabel className='font-bold text-lg text-gray-500'>Choose Category</FormLabel>
                      <div className='mt-2'>
                     
                        <div className='bg-white text-black flex  gap-x-4 gap-2 pl-6 p-4 items-center justify-start flex-wrap  rounded-xl'>
                          {appointmentTypes.map((type) => (
                            <label key={type.value} className='cursor-pointer'>
                                 <input type="radio"  name="appointmentType" value={type.value} 
                                onChange={()=>field.onChange(type.value)}
                                 className=' py-2 cursor-pointer peer hidden px-10 rounded-full'/>
                                 <div className="cursor-pointer rounded-full flex items-center gap-3 border-gray-300 px-4 py-2 text-gray-700 bg-gray-100 font-semibold text-sm peer-checked:border-blue-300 peer-checked:border-[0.2rem] peer-checked:font-bold peer-checked:text-blue-500 ">
                                    {type.icons}<span>{type.label}</span>
                                 </div>
                            </label>
                            
                          ))}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Available doctors */}
                <FormField
                  control={form.control}
                  name="doctorId"
                  render={({ field }) => (
                    <FormItem >
                      <FormLabel className='text-lg font-bold text-gray-500'>Available doctors</FormLabel>
                      <div className='mt-2'>
                        
                        <div className='bg-white text-black] p-5 h-[11rem] overflow-hidden w-full rounded-xl'>
                            <div className='overflow-x-scroll scrollbar-thin h-[8rem] w-full grid grid-cols-2 gap-4 '>
                                {doctors.length>0?(doctors.map((doctor) => (
                                <label key={doctor.doctorId} className='cursor-pointer'>
                                    <input type="radio" name='doctorId' value={doctor.doctorId} onChange={()=>field.onChange(doctor.doctorId)} className='w-[15rem] py-2 cursor-pointer px-10 peer hidden'/>
                                    <div className='cursor-pointer rounded-lg flex items-center gap-3 border-gray-300 px-4 py-2 text-gray-700 bg-gray-100 font-semibold text-sm peer-checked:border-blue-300 peer-checked:border-[0.2rem] peer-checked:font-bold peer-checked:text-blue-500 '>
                                        <div className=' bg-white rounded-lg'><UserRound color="#3b82f6" className='rounded-full m-4 bg-slate-200 p-1' size={30}/></div>
                                        <div className='flex flex-col'>
                                          <span className='text-[0.97rem] font-bold'>{doctor.doctorName}</span>
                                          <span className='text-sm text-gray-400'>{doctor.specialization}</span>
                                        </div>
                                    </div> 
                                </label>
                              ))):   
                              (<div className='w-[15rem] py-2 cursor-pointer px-10 '>
                                  No Doctors Available
                              </div>)}
                            </div>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                       <FormLabel className='text-lg font-bold text-gray-500'>Appointment Date</FormLabel>

                       <div className='bg-white  flex justify-center items-center rounded-xl overflow-hidden '>
                        <Calendar onChange={handleSelectedDate} value={selectedDate} className="border-transparent"/>
                        
                       </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timeSlot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg font-bold text-gray-500'>Available Time Slots</FormLabel>
                      <div className='overflow-hidden h-[22rem] bg-white flex justify-center items-center rounded-xl'>
                        
                        <div className=' w-full flex flex-wrap justify-evenly gap-3 p-3 px-[1rem] py-2  h-[20rem] overflow-scroll scrollbar-thin'>
                          {timeSlots.map((slot) => (
                            <label className=''>
                              <input type='radio' name='timeSlot' key={slot} value={slot} onChange={()=>field.onChange(slot)} className=' w-[10rem] py-1 peer hidden'/>
                                <div className='peer-checked:text-blue-500 peer-checked:border-blue-500 border p-4 rounded-md cursor-pointer'>{slot}</div>
                            </label>   
                          ))}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              

              </div>
                  {/* the right side */}
              <div className='flex flex-col gap-5 w-[40%]'>
              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg font-bold text-gray-500'>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input className="pl-10" placeholder="John Doe" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg font-bold text-gray-500' >Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input className="pl-10" type="email" placeholder="johndoe@example.com" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg font-bold text-gray-500'>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input className="pl-10" type="tel" placeholder="1234567890" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-lg font-bold text-gray-500'>Symptoms or Concerns (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly describe your symptoms or reasons for the appointment"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This information helps us prepare for your visit. Max 500 characters.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Please arrive 15 minutes before your scheduled appointment time. If you need to cancel or reschedule, please do so at least 24 hours in advance.
                </AlertDescription>
              </Alert>
              <Button type="submit" className="w-full flex bg-[#194778] text-white font-bold" disabled={isSubmitting}>
                {isSubmitting ? <p className='w-[70%] font-bold text-md'>Booking...</p> : <p className='w-[70%] font-bold text-md'>Book Appointment</p>}
                <div className='text-bold border-l-2 pl-1'>{selectedDate && <><p> {selectedDate.toDateString()} </p><p className='font-light'>{timeSlot}</p></>}</div>
              </Button>
              </div>  
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}