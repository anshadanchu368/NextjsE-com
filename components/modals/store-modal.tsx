"use client";

import axios from "axios"; 
import * as z from "zod"

import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";


const formSchema= z.object({
  name: z.string().min(1)
})



export const StoreModal = () => {
      const storeModal = useStoreModal();

      const [loading,setLoading] =useState(false)

      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
        },
      })

      const onSubmit = async (values: z.infer<typeof formSchema>) =>{
         console.log(values);

         try{
          setLoading(true);
          const response = await axios.post('api/stores',values)

          console.log(response.data);
          
         }catch(error){
          console.log(error);
          
         }finally{
            setLoading(false);
         }
         
      }
       return(

    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
      <div className="space-y-4 py-2 pb-4">
       <Form  {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)}>
               <FormField
                  control={form.control}
                  name="name"
                  render={({field})=>(
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                         <FormControl>
                            <Input disabled={loading} placeholder="E-commerce" {...field}/>
                         </FormControl>
                         <FormMessage>
                          
                         </FormMessage>
                      </FormItem>
                  )}
               />
                 <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                      <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>Cancel</Button>
                      <Button  disabled={loading} type="submit">Continue</Button>
                 </div>

           </form>
       </Form>
      </div>

      </div>
    </Modal>

       )
}