
import * as React from 'react'
import { useState, useEffect } from 'react'
import { format, addDays, isBefore, isAfter, startOfDay } from 'date-fns'
import { CalendarIcon, Clock, User, Mail, Phone, Stethoscope, AlertCircle } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { Button } from "@repo/ui/components/ui/button"
import { Calendar } from "@repo/ui/components/ui/calendar"
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

import { cn } from "@repo/ui/lib/utils"

const appointmentTypes = [
  { value: 'Cardiology', label: 'Cardiology' },
  { value: 'Neurology', label: 'Neurology' },
  { value: 'Orthopedics', label: 'Orthopedics' },
  { value: 'Pediatrics', label: 'Pediatric Care' },
  { value: 'Dermatology', label: 'Dermatology' },
  { value: 'Psychiatry', label: 'Psychiatry' },
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
  symptoms: z.string().max(500, { message: "Symptoms must not exceed 500 characters." }).optional(),
})


export default function Booking() {
  const [date, setDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [doctors,setDoctors]=useState<{doctorName:string;doctorId:string}[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      appointmentType: undefined,
      doctorId:"",
      date: undefined,
      timeSlot: undefined,
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
  
  useEffect(()=>{
      const fetchData= async ()=>{
          const doctorsData=await fetchDoctors();
          setDoctors(doctorsData);
      }
      fetchData();
      // console.log("doctors fetched:",doctors);
  },[form.getValues('appointmentType')]);

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

  
  return (
    <div className="container mx-auto my-5 p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className='mb-2'>
          <CardTitle className="text-2xl font-bold text-primary">Book Your Appointment</CardTitle>
          <CardDescription>Fill out the form below to schedule your visit to our hospital.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
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
                      <FormLabel>Email</FormLabel>
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
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
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
                  name="appointmentType"
                  render={({ field }) => (
                    <FormItem >
                      <FormLabel>Appointment Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className='bg-white'>
                          <SelectTrigger>
                            <SelectValue placeholder="Select appointment type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='bg-white text-black]'>
                          {appointmentTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value} className='w-[15rem] py-2 cursor-pointer px-10 '>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="doctorId"
                  render={({ field }) => (
                    <FormItem >
                      <FormLabel>Available doctors</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        
                        <FormControl className='bg-white'>
                          <SelectTrigger>
                            <SelectValue placeholder="Select appointment type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='bg-white text-black]'>
                          {doctors.length>0?(doctors.map((doctor) => (
                            <SelectItem key={doctor.doctorId} value={doctor.doctorId} className='w-[15rem] py-2 cursor-pointer px-10 '>
                              {doctor.doctorName}
                            </SelectItem>
                          ))):   
                          (<SelectItem disabled value="none" className='w-[15rem] py-2 cursor-pointer px-10 '>
                            No Doctors Available
                          </SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Appointment Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl className='bg-white flex'>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto m-auto bg-white " align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date)
                              setDate(date)
                            }}
                            disabled={(date) =>
                              isBefore(date, startOfDay(new Date())) ||
                              isAfter(date, addDays(new Date(), 30))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timeSlot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel >Available Time Slots</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className='bg-white'>
                          <SelectTrigger>
                            <Clock className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Select a time slot" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='bg-white w-[6.5rem] px-[1rem]'>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot} className='w-[10rem] py-1'>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symptoms or Concerns (Optional)</FormLabel>
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
              <Button type="submit" className="w-full bg-black text-white font-bold" disabled={isSubmitting}>
                {isSubmitting ? "Booking..." : "Book Appointment"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}