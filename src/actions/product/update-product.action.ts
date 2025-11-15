import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
 
export const updateProduct = defineAction({
   accept: 'json',
   input: z.string(),
   handler: async (input) => {
   return;
   }
})