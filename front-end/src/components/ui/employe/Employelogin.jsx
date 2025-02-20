

"use client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { axiosEmploye } from "@/API/Axios";
import {
Form,
FormControl,
FormField,
FormItem,
FormLabel,
FormMessage,

} 
from "@/components/ui/form"



const formSchema = z.object({
Email: z.string().min(2).max(50),
Password:z.string().min(8).max(30),
});

export default function Employelogin() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            Email:'assith@2003.com',
            Password:'',
        }
    });

      // 2. Define a submit handler.
    function onSubmit(values) {
        const axios =axiosEmploye.defaults
        console.log(values,axios);
    }
    
return( <>
<Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
<FormField
    control={form.control}
    name="Email"
    render={({ field }) => (
    <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
    <Input type="Email" placeholder="Email" {...field} />
    
        </FormControl>

        <FormMessage />
    </FormItem>
)}
/>

<FormField
control={form.control}
name="Password"
render={({ field }) => (
<FormItem>
    <FormLabel>Password</FormLabel>
    <FormControl>
    <Input type="password" placeholder="********" {...field} />
    </FormControl>

    <FormMessage />
</FormItem>
)}
/>
<Button type="submit">Submit</Button>
</form>
</Form>
    </>
);
}
