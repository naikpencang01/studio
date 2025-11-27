'use server';

import { generateProductDescription as generateProductDescriptionFlow } from '@/ai/flows/generate-product-description';
import type { GenerateProductDescriptionInput } from '@/ai/flows/generate-product-description';

export async function generateProductDescription(input: GenerateProductDescriptionInput) {
  // In a real app, you would add authentication and authorization checks here.
  // For example: check if the user is an admin.
  try {
    const result = await generateProductDescriptionFlow(input);
    return result;
  } catch (error) {
    console.error('Error generating product description:', error);
    return { error: 'Gagal menghasilkan deskripsi. Silakan coba lagi.' };
  }
}
